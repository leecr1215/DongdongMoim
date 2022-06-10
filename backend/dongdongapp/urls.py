from django.urls import path, include

from .views import user_views, postApplication_views
from .serializers import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from .views import post_views, comment_views, friend_views

urlpatterns = [

    # 사용자 조회
    path('v1/users/all', user_views.UserList.as_view()),
    path('v1/users', user_views.CreateUser.as_view()),
    path('v1/users/<int:pk>', user_views.UserDetail.as_view()),

    # 로그인 (JWT TOKEN)
    path('v1/token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/token/verify', TokenVerifyView.as_view(), name='token_verify'),

    # 게시글
    path('v1/posts/all', post_views.PostList.as_view()),
    path('v1/posts', post_views.CreatePost.as_view()),
    path('v1/posts/<int:pk>', post_views.PostDetail.as_view()),
    path('v2/posts/<int:pk>', post_views.UserPostList.as_view()),

    # 댓글
    path('v1/comments', comment_views.CommentList.as_view()),
    path('v1/comments/<int:pk>', comment_views.CommentDetail.as_view()),
    path('v1/posts/<int:pk>/comments', comment_views.CommentList.as_view()),


    # 친구
    path('v1/friends', friend_views.FriendList.as_view()),
    path('v1/friends/<int:user1>', friend_views.FriendDetail.as_view()),
    path('v2/friends/<int:user1>', friend_views.FriendDetail2.as_view()),
    path('v1/friends/<int:user1>/<int:user2>',
         friend_views.FriendDetail.as_view()),
    path('v1/friends/connection/<int:user1>/<int:user2>',
         friend_views.FriendDetail3.as_view()),


    # 게시글 신청
    path('v1/posts/applicants', postApplication_views.PostApplicantsList.as_view()),
    path('v1/posts/applicants/<int:pk>',
         postApplication_views.UserApplicantsList.as_view()),
    path('v1/posts/<int:pk>/applicants',
         postApplication_views.PostApplicants.as_view()),
    path('v1/posts/<int:post_pk>/applicants/<int:user_pk>',
         postApplication_views.PostApplicationDetail.as_view())
]
