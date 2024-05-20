from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    PropertyListCreateView,
    PropertyRetrieveUpdateDestroyView,
    LikeView,
    InterestedBuyerView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('properties/', PropertyListCreateView.as_view(), name='property-list-create'),
    path('properties/<int:pk>/', PropertyRetrieveUpdateDestroyView.as_view(), name='property-retrieve-update-destroy'),
    path('likes/', LikeView.as_view(), name='like'),
    path('interested/', InterestedBuyerView.as_view(), name='interested'),
]