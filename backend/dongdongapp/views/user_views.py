from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import UserSerializer
from ..models import CustomUser
from rest_framework import permissions

class UserList(APIView):
    # 사용자 조회 
    permission_classes = [permissions.IsAdminUser]
    def get(self,request):
        serializer = UserSerializer(CustomUser.objects.all(),many=True)
        return Response(serializer.data)
    
class CreateUser(APIView):
    # 회원가입 
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors,status=400)
    

class UserDetail(APIView):
    
    def get_object(self, pk): # PK 존재할 경우 리턴 
        user = CustomUser.objects.get(pk=pk)
        if not "username" in user:
            return Response("NOT FOUND",status=404)
        return user
        
    def get(self,request,pk):
        serializer = UserSerializer(self.get_object(pk))
        return Response(serializer.data)
    
    def post(self,request,pk):
        serializer = UserSerializer(data=request.data)
        return Response(serializer.data)
    
    def put(self,request,pk):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)
    
    def delete(self,request,pk):
        serializer = UserSerializer(self.get_object(pk))
        if serializer.is_valid():
            serializer.delete()
            return Response(status=204)
        return Response(serializer.errors,status=400)
       
