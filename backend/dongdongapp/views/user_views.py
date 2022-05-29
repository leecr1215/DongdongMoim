from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import UserSerializer, UserInfoSerializer
from ..models import CustomUser
from rest_framework import permissions, status

class UserList(APIView):
    # 사용자 조회 
    permission_classes = [permissions.IsAdminUser]
    def get(self,request):
        serializer = UserSerializer(CustomUser.objects.all(),many=True)
        return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)
    
class CreateUser(APIView):
    # 회원가입 
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True,serializer.data,201),status=status.HTTP_201_CREATED)
        return Response(Util.response(False,serializer.errors,400),status=status.HTTP_400_BAD_REQUEST)
    

class UserDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            return user
        except CustomUser.DoesNotExist:
            return Response(data=Util.response("NOT FOUND",400,False), status=status.HTTP_404_NOT_FOUND)
    
    def get(self,request,pk):
        serializer = UserInfoSerializer(self.get_object(pk))
        return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)
    
    # 회원 정보 수정 
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserInfoSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True,serializer.data,200),status=status.HTTP_200_OK)
        return Response(Util.response(False,serializer.errors,400),status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        serializer = UserInfoSerializer(self.get_object(pk))
        if serializer.is_valid():
            serializer.delete()
            return Response(Util.response(True,serializer.data,204),status=status.HTTP_204_NO_CONTENT)
        return Response(Util.response(False,serializer.errors,400),status=status.HTTP_400_BAD_REQUEST)


class Util():
    def response(success,data,status):
        return {
            "success":success,
            "result":data,
            "status":status
        }