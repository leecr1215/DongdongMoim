from ast import Delete
from dataclasses import field
import json
from rest_framework.response import Response
from rest_framework.decorators import APIView
from ..serializers import PostApplicationSerializer, PostSerializer, UserSerializer, UserInfoSerializer
from ..models import Comment, CustomUser, Post, PostApplication
from rest_framework import permissions
from rest_framework import status
from django.core import serializers
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder


class PostApplicantsList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        serializers = PostApplicationSerializer(
            PostApplication.objects.all(), many=True)
        return Response(Util.response(True, serializers.data, 200), status=status.HTTP_200_OK)


class PostApplicants(APIView):
    permission_classes = [permissions.AllowAny]

    # 게시물 별 지원자 조회
    def get(self, request, pk):
        post_id = Post.objects.get(pk=pk).post_id
        applicant = PostApplication.objects.select_related("user_id").filter(
            post_id=post_id).values("postApplication_id", "post_id", "user_id", "user_id__username")
        return Response(Util.response(True, applicant, 200), status=status.HTTP_200_OK)


class PostApplicationDetail(APIView):
    permission_classes = [permissions.AllowAny]

    # user의 post 신청 여부
    def get(self, request, post_pk, user_pk):
        try:
            applicant = PostApplication.objects.get(
                post_id=post_pk, user_id=user_pk)
            # serializer = PostApplicationSerializer(applicant)
            return Response(Util.response(True, {"application": True}, 200), status=status.HTTP_200_OK)
        except PostApplication.DoesNotExist:
            return Response(Util.response(True, {"application": False}, 200), status=status.HTTP_200_OK)

    # user의 post 신청
    def post(self, request, post_pk, user_pk):
        serializer = PostApplicationSerializer(
            data={'user_id': user_pk, 'post_id': post_pk})
        if serializer.is_valid():
            serializer.save()
            post = Post.objects.get(pk=post_pk)
            Post.objects.filter(pk=post_pk).update(
                applicantsNum=post.applicantsNum + 1)
            return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

    # user의 post 신청 취소
    def delete(self, request, post_pk, user_pk):
        try:
            applicant = PostApplication.objects.get(
                post_id=post_pk, user_id=user_pk)
            applicant.delete()
            post = Post.objects.get(pk=post_pk)
            # 해당 post의 신청인원 감소
            Post.objects.filter(pk=post_pk).update(
                applicantsNum=post.applicantsNum - 1)
            return Response(Util.response(True, "", 204), status=status.HTTP_204_NO_CONTENT)
        except PostApplication.DoesNotExist:
            return Response(Util.response(False, "", 400), status=status.HTTP_400_BAD_REQUEST)


class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
