from django.urls import path

from . import views


app_name = 'thoughtapp'
urlpatterns = [
    path('home', views.home, name='home'),
    path("register", views.register_user, name="register"),
    path("create_note", views.create_note, name="create_note"),
    path("main_view", views.main_view, name="main_view"),
    path("logout_user", views.logout_user, name="logout_user"),
    path("login_user", views.login_user, name="login_user"),
    path("delete_note/<int:note_id>/", views.delete_note, name="delete_note"),
    path("edit_note/<int:note_id>/", views.edit_note, name="edit_note"),
]