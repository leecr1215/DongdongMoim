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
    def post(self,request): #자신의 id(user1), 친구 신청할 id(user2)
        serializer = FriendSerializer(data=request.data)
        user1_id = request.data["user1_id"]
        user2_id = request.data["user2_id"]
        friend = Friend.objects.filter(Q(user1_id=user1_id,user2_id=user2_id)|Q(user1_id=user2_id,user2_id=user1_id))
        
        # 이미 친구인 경우 
        if friend:
            return Response(Util.response(False,"이미 친구입니다.",400),status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
        request2_data = {
            "user1_id": request.data["user2_id"],
            "user2_id": request.data["user1_id"]
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
        get_friends = Friend.objects.filter(user1_id=user1,status="CONNECTING").all()
        test = []
        for k in get_friends.values():
            user2_id = k["user2_id_id"]
            username = CustomUser.objects.get(pk=user2_id).username
            k["username"] = username
            test.append(k)

        return Response(Util.response(True,test,200),status=status.HTTP_200_OK)
    
    # 친구 요청 수락 
    def put(self,request,user1,user2):
        user1_id = self.kwargs['user1']
        user2_id = self.kwargs['user2']
        Friend.objects.filter(Q(user1_id=user1_id,user2_id=user2_id)|Q(user1_id=user2_id,user2_id=user1_id)).update(status = "CONNECTING")
        return Response(Util.response(True,"친구 수락에 성공하였습니다.",204),status=status.HTTP_204_NO_CONTENT)
      
    # 친구 연결 끊기 
    # 자신의 id(user1),친구 끊을 id(user2)
    def delete(self,request,user1,user2):
        user1_id = self.kwargs['user1']
        user2_id = self.kwargs['user2']
        friend = Friend.objects.filter(Q(user1_id=user1_id,user2_id=user2_id)|Q(user1_id=user2_id,user2_id=user1_id))
        serializer = FriendSerializer(instance=friend,many=True)
        friend.delete()
        
        return Response(Util.response(True,serializer.data,204),status=status.HTTP_204_NO_CONTENT)

class FriendDetail2(APIView):
    permission_classes = [permissions.AllowAny]
    # 나의 친구리스트 조회 ver.2
    def get(self,request,user1):
        friends = Friend.objects.filter(user1_id=user1,status="CONNECTING").all()
        queryset = friends.select_related("user2_id").values("friend_id", "user1_id", "user2_id", "user2_id__username")
        queryset = queryset.values(friend_username=F("user2_id__username"))
        print(str(queryset))
     
        return Response(Util.response(True,queryset.values("friend_username"),204),status=status.HTTP_204_NO_CONTENT)

class Util():
    def response(success,data,status):
        return {
            "success":success,
            "result":data,
            "status":status
        }