from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import CommentSerializer, UserSerializer, UserInfoSerializer
from ..models import Comment, CustomUser
from rest_framework import permissions
from rest_framework import status

class CommentList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request):
        serializer = CommentSerializer(Comment.objects.all(),many=True)
        return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)
    # 댓글 작성 
    def post(self,request): #user_id,text 
        user = CustomUser.objects.get(pk=request.data["user_id"])
        username = user.username
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {"user_id": serializer.data["user_id"],"text": serializer.data["text"], "username": username}
            return Response(Util.response(True,data,201),status=status.HTTP_201_CREATED)
        return Response(Util.response(False,serializer.errors,400),status=status.HTTP_400_BAD_REQUEST)
    

class Util():
    def response(success,data,status):
        return {
            "success":success,
            "result":data,
            "status":status
        }