from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    gender = models.CharField(max_length=1) # M or F
    phone_number = models.CharField(max_length=15)
    age = models.IntegerField()
    soccer_skill = models.IntegerField()
    baseball_skill = models.IntegerField()
    badminton_skill = models.IntegerField()
    
    class Meta:
        db_table = 'user'
        