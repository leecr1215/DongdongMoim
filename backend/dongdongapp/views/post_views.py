from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, permissions

from ..serializers import PostSerializer
from ..models import Post
from django.db.models import Q
from urllib import parse

class PostList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        search_age = request.GET.get('age')
        search_gender = request.GET.get('gender')
        search_skill = request.GET.get('skill')
        if search_gender == "I":
            search_gender = None
        if search_skill == 0:
            search_skill = None
        if (search_age == None) & (search_gender == None) & (search_skill == None): # 필터조건 없는 경우
            final_queryset = Post.objects.all().order_by('-post_date')
        else:
            r_age = 150
            # 나이대 필터의 경우 따로 예외처리
            if search_age == None:
                search_age = 0
            else:    
                search_age = int(search_age)
                if search_age < 50:
                    r_age = search_age + 10
            if (search_gender == None) & (search_skill==None): # 나이대만 설정한 경우
                queryset = Post.objects.filter(age__gte=search_age, age__lt=r_age)
                final_queryset = queryset.order_by('-post_date')
            elif search_gender == None: # 스킬로 정렬하는 경우 
                search_skill = int(search_skill)
                queryset = Post.objects.filter(Q(age__gte=search_age) & Q(age__lt=r_age) & Q(exercise_skill=search_skill))                    
                final_queryset = queryset.order_by('-post_date')
            elif search_skill == None: # 성별로 정렬하는 경우
                queryset = Post.objects.filter(Q(age__gte=search_age) & Q(age__lt=r_age) & Q(gender=search_gender))
                final_queryset = queryset.order_by('-post_date')
            else: # 나이대, 성별, 스킬로 정렬하는 경우
                search_skill = int(search_skill)
                queryset = Post.objects.filter(age__gte=search_age, age__lt=r_age, gender=search_gender, exercise_skill=search_skill)
                final_queryset = queryset.order_by('-post_date')    
        serializer = PostSerializer(final_queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)


class CreatePost(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    permission_classes = [permissions.AllowAny]
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