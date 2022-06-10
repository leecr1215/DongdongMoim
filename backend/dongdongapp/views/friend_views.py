import json
from django.core import serializers
from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import CommentSerializer, FriendSerializer, UserSerializer, UserInfoSerializer
from ..models import Comment, CustomUser, Post, Friend
from rest_framework import permissions
from rest_framework import status
from django.db.models import Q,F

class FriendList(APIView):
    permission_classes = [permissions.AllowAny]
    # 자신의 친구들 조회 
    # GET 친구의 username, 친구의 전화번호  
    """
    select *
    From ( select * from friend where user1_id == user1_id or user1_id == user2_id; ) F 
    JOIN USER 
    ON (F.user2_id == CustomUser.user_id)
    """  
    # 친구 리스트 전체 조회 
    def get(self,request,format=None):
        friends = Friend.objects.all()
        serializer = FriendSerializer(instance=friends,many=True)
        return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)

    # 친구 신청
    def post(self,request): #자신의 id(my), 친구 신청할 id(your), status(request)
        serializer = FriendSerializer(data=request.data)
        my_id = request.data["my_id"]
        your_id = request.data["your_id"]

        friend = Friend.objects.filter(Q(my_id=my_id,your_id=your_id,status="CONNECTING")|Q(my_id=your_id,your_id=my_id,status="CONNECTING"))
        
        # 이미 친구인 경우 
        if friend:
            return Response(Util.response(False,"이미 친구입니다.",400),status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
        request2_data = {
            "my_id": request.data["your_id"],
            "your_id": request.data["my_id"],
            "status": "REQUESTED"
        }
        serializer = FriendSerializer(data=request2_data)
        if serializer.is_valid():
            serializer.save()
        return Response(Util.response(True,"친구 신청이 완료되었습니다.",201),status=status.HTTP_201_CREATED)

    
class FriendDetail(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get_object(self, pk):
        try:
            post = Comment.objects.get(pk=pk)
            return post
        except Comment.DoesNotExist:
            return Response(Util.response(False, "NOT FOUND", 400), status=status.HTTP_400_BAD_REQUEST)
        
    # 나의 친구리스트 조회 
    def get(self,request,user1):
        get_friends = Friend.objects.filter(my_id=user1,status="CONNECTING").all()
        test = []
        for k in get_friends.values():
            your_id = k["your_id_id"]
            username = CustomUser.objects.get(pk=your_id).username
            k["username"] = username
            test.append(k)

        return Response(Util.response(True,test,200),status=status.HTTP_200_OK)
    
    # 친구 요청 수락 
    def put(self,request,user1,user2):
        my_id = self.kwargs['user1']
        your_id = self.kwargs['user2']
        Friend.objects.filter(Q(my_id=my_id,your_id=your_id)|Q(my_id=your_id,your_id=my_id)).update(status = "CONNECTING")
        return Response(Util.response(True,"친구 수락에 성공하였습니다.",204),status=status.HTTP_204_NO_CONTENT)
      
    # 친구 연결 끊기 
    # 자신의 id(my),친구 끊을 id(your)
    def delete(self,request,user1,user2):
        my_id = self.kwargs['user1']
        your_id = self.kwargs['user2']
        friend = Friend.objects.filter(Q(my_id=my_id,your_id=your_id)|Q(my_id=your_id,your_id=my_id))
        serializer = FriendSerializer(instance=friend,many=True)
        friend.delete()
        
        return Response(Util.response(True,serializer.data,204),status=status.HTTP_204_NO_CONTENT)

class FriendDetail2(APIView):
    permission_classes = [permissions.AllowAny]
    # 나의 친구리스트 조회 ver.2
    def get(self,request,user1):
        friends = Friend.objects.filter(my_id=user1,status="CONNECTING").all()
        queryset = friends.select_related("your_id").values("friend_id", "my_id", "your_id", "your_id__username","your_id__phone_number")
        
        queryset = queryset.values(friend_username=F("your_id__username"),phone_number=F("your_id__phone_number"))
        # queryset = queryset.values(phone_number=F("your_id__phone_number"))

        print(str(queryset))
     
        return Response(Util.response(True,queryset.values("friend_username","phone_number"),204),status=status.HTTP_204_NO_CONTENT)

### 친구 여부 조회 CONNECTING, NONE, REQUEST, REQUESTED
class FriendDetail3(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request,user1,user2):
        my_id = self.kwargs['user1']
        your_id = self.kwargs['user2']
        friend = Friend.objects.filter(Q(my_id=my_id,your_id=your_id)).only()
        if not friend:
            result = {}
            result["status"] = "None"
            return Response(Util.response(True,result,204),status=status.HTTP_204_NO_CONTENT)
        return Response(Util.response(True,friend.values("status")[0],204),status=status.HTTP_204_NO_CONTENT)

class FriendDetail4(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request,user1):
        my_id = self.kwargs['user1']
        friends = Friend.objects.filter(Q(my_id=my_id)&Q(status='REQUESTED'))
        queryset = friends.select_related("your_id").values("your_id__username")
        queryset = queryset.values(friend_username=F("your_id__username"))

        return Response(Util.response(True,queryset.values("your_id","friend_username"),204),status=status.HTTP_204_NO_CONTENT)


class Util():
    def response(success,data,status):
        return {
            "success":success,
            "result":data,
            "status":status
        }