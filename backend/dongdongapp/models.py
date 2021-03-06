from pyexpat import model
from tkinter import CASCADE
from django import db
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
# Create your models here.


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True, db_column="user_id")
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    gender = models.CharField(max_length=1)  # M or F
    phone_number = models.CharField(max_length=15)
    age = models.IntegerField(null=True)
    soccer_skill = models.IntegerField(null=True)
    baseball_skill = models.IntegerField(null=True)
    basketball_skill = models.IntegerField(null=True)

    class Meta:
        db_table = 'user'


class Post(models.Model):
    post_id = models.AutoField(primary_key=True, db_column="post_id")
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, db_column="user_id")
    title = models.CharField(max_length=20)
    content = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)
    meeting_date = models.DateTimeField(null=True)
    post_date = models.DateTimeField(null=True, auto_now_add=True)
    required_number = models.IntegerField(default=1, null=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, null=True)
    exercise = models.CharField(max_length=10, null=True)
    exercise_skill = models.IntegerField(default=1, null=True)
    applicantsNum = models.IntegerField(default=0, null=True)


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True, db_column="comment_id")
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, db_column="post_id")
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, db_column="user_id")
    text = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=now, null=True)


class PostApplication(models.Model):
    postApplication_id = models.AutoField(
        primary_key=True, db_column="postApplication_id")
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, db_column="user_id")
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, db_column="post_id")

class Friend(models.Model):
    friend_id = models.AutoField(primary_key=True, db_column="friend_id")
    my_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, db_column="my_id", related_name="me")
    your_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, db_column="your_id", related_name="you")
    status = models.CharField(
        max_length=10, default='NONE')  # NONE, CONNECTING, REQUEST, REQUESTED  
