from pyexpat import model
from tkinter import CASCADE
from django import db
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return str(self.username)

class Post(models.Model):
    post_id = models.AutoField(primary_key=True, db_column="post_id")
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_column="user_id")
    title = models.CharField(max_length=20)
    content = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)
    meeting_date = models.DateTimeField(null=True)
    post_date = models.DateTimeField(null=True, auto_now_add=True)
    required_number = models.IntegerField(default=1, null=True)
    gender = models.CharField(max_length=10, null=True)
    exercise = models.CharField(max_length=10, null=True)
    exercise_skil = models.IntegerField(default=1, null=True)




