from django.contrib.auth.forms import UserCreationForm
from django import forms


class CreateUserForm(UserCreationForm):
    class Meta():
        fields = ["first_name", "last_name", "email", "password1", "password2"]


class CreateNoteForm(forms.Form):
    title = forms.CharField(widget = forms.Textarea(attrs={'class': 'input-area'}))
    category = forms.CharField(widget = forms.Textarea(attrs={'class': 'input-area'}))
    content = forms.CharField(widget = forms.Textarea(attrs={'class': 'text-area'}))
