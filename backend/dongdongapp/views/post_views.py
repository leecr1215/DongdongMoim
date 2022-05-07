from ast import Delete
from dataclasses import dataclass
from os import stat
from urllib import request, response
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status

from ..serializers import PostSerializer
from ..models import Post


class PostList(APIView):
    def get(self, request):
        serializer = PostSerializer(Post.objects.all(), many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)


class CreatePost(APIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
        return Response(Util.response(True, serializer.data, 400), status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    def get_object(self, pk):
        try:
            post = Post.objects.get(pk=pk)
            return post
        except Post.DoesNotExist:
            return Response(Util.response(False, "NOT FOUND", 400), status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, pk):
        serializer = PostSerializer(self.get_object(pk))
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        instance = self.get_object(pk)
        serializer = PostSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        serializer = PostSerializer(self.get_object(pk))
        if serializer.is_valid():
            serializer.delete()
            return Response(Util.response(True, serializer.data, status=204), status=status.HTTP_204_NO_CONTENT)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)


class Util():
    def response(success, data, status):
        return {
            "success":success,
            "data":data,
            "status":status
        }