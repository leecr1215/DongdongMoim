from django.urls import path, include
from .views import user_views

urlpatterns = [
    path('users/all',user_views.UserList.as_view()),
    path('users',user_views.CreateUser.as_view()),
    path('users/<int:pk>',user_views.UserDetail.as_view())
]
