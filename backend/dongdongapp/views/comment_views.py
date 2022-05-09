from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import CommentSerializer, UserSerializer, UserInfoSerializer
from ..models import Comment, CustomUser, Post 
from rest_framework import permissions
from rest_framework import status

class CommentList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request,pk,format=None):
        post_id = Post.objects.get(pk=pk).post_id
        comment = Comment.objects.filter(post_id=post_id)
        serializer = CommentSerializer(instance=comment, many=True)
        return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)

    
    # 댓글 작성 
    def post(self,request): #user_id,text 
        user = CustomUser.objects.get(pk=request.data["user_id"])
        username = user.username
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {"text": serializer.data["text"], "username": username}
            return Response(Util.response(True,data,201),status=status.HTTP_201_CREATED)
        return Response(Util.response(False,serializer.errors,400),status=status.HTTP_400_BAD_REQUEST)
    
class CommentDetail(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get_object(self, pk):
        try:
            post = Comment.objects.get(pk=pk)
            return post
        except Comment.DoesNotExist:
            return Response(Util.response(False, "NOT FOUND", 400), status=status.HTTP_400_BAD_REQUEST)
        
    def get(self,request,pk):
        serializer = CommentSerializer(self.get_object(pk))
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
    
class Util():
    def response(success,data,status):
        return {
            "success":success,
            "result":data,
            "status":status
        }