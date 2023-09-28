import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

# class User(models.Model):
#     id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    pass


class Task(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()

