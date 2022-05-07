from django.urls import path, include

from .views import user_views
from .serializers import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from .views import post_views

urlpatterns = [
    
    # 사용자 조회
    path('users/all',user_views.UserList.as_view()),
    path('users',user_views.CreateUser.as_view()),
    path('users/<int:pk>',user_views.UserDetail.as_view()),
    
    # 로그인 (JWT TOKEN)
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),

    # 게시글
    path('posts/all', post_views.PostList.as_view()),
    path('posts', post_views.CreatePost.as_view()),
    path('posts/<int:pk>', post_views.PostDetail.as_view()),
]
