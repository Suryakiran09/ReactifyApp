from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from .models import Property, Like
from .serializers import UserSerializer, PropertySerializer, LikeSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        user_data = UserSerializer(instance=user).data
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key, 'user': user_data})

class PropertyPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['seller__email', 'place', 'area']
    ordering_fields = ['price', 'bedrooms', 'bathrooms']
    pagination_class = PropertyPagination
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        
        if min_price is not None and min_price != "":
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None and max_price != "":
            queryset = queryset.filter(price__lte=max_price)
        
        if request.user.is_seller:
            queryset = queryset.filter(seller=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

        
class PropertyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        seller = self.request.user
        serializer.save(seller=seller)

    def get_queryset(self):
        return self.queryset.filter(seller=self.request.user)

class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        property_id = serializer.validated_data['id']
        property = Property.objects.get(id=property_id)
        buyer = request.user

        if property.liked_users.filter(user=buyer).exists():
            return Response({'error': 'You have already liked this property'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = Like.objects.create(user=request.user)

        like = property.liked_users.add(user)
        property.likes += 1
        property.save()

        return Response({'success': 'Property liked'}, status=status.HTTP_201_CREATED)

class InterestedBuyerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        property_id = request.data.get('property')
        property = Property.objects.get(id=property_id)
        buyer = request.user

        # Send email to buyer and seller
        buyer_email = buyer.email
        seller_email = property.seller.email
        subject = 'Interested in Property'
        email = settings.DEFAULT_FROM_EMAIL
        message = f'{buyer.email} is interested in your property {property.place},{property.area} Details - Phone {buyer.phone_number} .'
        send_mail(subject, message, 'suryakirant7@gmail.com', [buyer_email, seller_email])

        return Response({'success': 'Email sent to buyer and seller'}, status=status.HTTP_200_OK)

