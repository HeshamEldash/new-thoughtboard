from django.urls import path

from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'api'
urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('lists/<int:user_id>/', views.get_api_lists, name="lists"),
    path('list/<int:pk>/', views.get_api_list, name="list"),
    path('notes/<int:user_id>/', views.get_api_notes, name="notes"),
    path('note/<int:pk>/', views.api_note_details, name="note"),


]