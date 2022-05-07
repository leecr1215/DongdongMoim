from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    gender = models.CharField(max_length=1) # M or F
    phone_number = models.CharField(max_length=15)
    age = models.IntegerField(null=True)
    soccer_skill = models.IntegerField(null=True)
    baseball_skill = models.IntegerField(null=True)
    badminton_skill = models.IntegerField(null=True)
    
    class Meta:
        db_table = 'user'
        