from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

class UserManager(BaseUserManager):
   def create_user(self, email, first_name, last_name, phone_number, password=None):
       if not email:
           raise ValueError('Users must have an email address')

       user = self.model(
           email=self.normalize_email(email),
           first_name=first_name,
           last_name=last_name,
           phone_number=phone_number,
       )

       user.set_password(password)
       user.save(using=self._db)
       return user

   def create_superuser(self, email, first_name, last_name, phone_number, password):
       user = self.create_user(
           email,
           first_name=first_name,
           last_name=last_name,
           phone_number=phone_number,
           password=password,
       )
       user.is_staff = True
       user.is_superuser = True
       user.save(using=self._db)
       return user

class User(AbstractBaseUser, PermissionsMixin):
   email = models.EmailField(max_length=255, unique=True)
   first_name = models.CharField(max_length=255)
   last_name = models.CharField(max_length=255, blank=True)
   phone_number = models.CharField(max_length=20)
   is_seller = models.BooleanField(default=False)
   is_buyer = models.BooleanField(default=False)
   is_active = models.BooleanField(default=True)
   is_staff = models.BooleanField(default=False)
   date_joined = models.DateTimeField(default=timezone.now)

   objects = UserManager()

   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS = ['first_name', 'phone_number']

   def __str__(self):
       return f"{self.first_name}-{self.email}"
   

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')

class Property(models.Model):
   seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
   place = models.CharField(max_length=100)
   area = models.CharField(max_length=100)
   bedrooms = models.PositiveIntegerField()
   bathrooms = models.PositiveIntegerField()
   price = models.DecimalField(max_digits=10, decimal_places=2)
   hospitals_nearby = models.TextField(blank=True, null=True)
   colleges_nearby = models.TextField(blank=True, null=True)
   liked_users = models.ManyToManyField(Like, related_name='liked_properties')
   likes = models.PositiveIntegerField(default=0)
