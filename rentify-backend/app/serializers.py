from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .models import User, Property, Like

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'is_seller', 'is_buyer']
        extra_kwargs = {'password': {'write_only': True}, 'last_name' : {'required': False}, 'is_seller' : {'required': False}, 'is_buyer' : {'required': False}}

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False, required=True)

class LikesSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Like
        fields = ['user']
    
    def get_user(self, obj):
        return obj.user.id
    
class PropertySerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField()
    liked_users = LikesSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'seller', 'place', 'area', 'bedrooms', 'bathrooms', 'price', 'hospitals_nearby', 'colleges_nearby', 'likes', 'liked_users']
        read_only_fields = ('seller', 'liked_users')

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.is_seller:
            raise serializers.ValidationError(_('Only sellers can create properties.'))
        return attrs

    def get_seller(self, obj):
        return obj.seller.email
    
class LikeSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)