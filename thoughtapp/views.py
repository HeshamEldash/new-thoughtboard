from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .forms import CreateNoteForm
from .models import Note, List
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from itertools import chain
# Create your views here.

def home(request):
    return render(request, "App/index.html")


def register_user(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("App:home"))
    else:
        if request.method == "POST":
            email = request.POST["email"]
            password1 = request.POST["password1"]
            password2 = request.POST["password2"]
            user = User.objects.create_user( email,email, password1)

            # login user

            user = authenticate(request, username=email, password=password1)
            if user is not None:
                login(request, user)

            return HttpResponseRedirect(reverse("App:home"))
        return render(request, "App/register.html", context={})

def login_user(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("App:home"))
        else:
            render(request, "App/login_user.html")

    return render(request, "App/login_user.html")



def logout_user(request):
    logout(request)
    return render(request, "App/index.html")

@login_required(login_url='/app/login_user')
def create_note(request):
    form = CreateNoteForm()
    context = {
        "form": form
    }
    if request.method == "POST":
        title = request.POST["title"]
        category = request.POST["category"]
        content = request.POST["content"]

        new_note = Note(
            title=title,
            category = category,
            content = content,
            user= request.user
        )
        new_note.save()
        return HttpResponseRedirect(reverse("App:main_view"))
    return render(request, "App/create_note.html", context=context)

@login_required(login_url='/app/login_user')
def main_view(request):
    notes = Note.objects.filter(user=request.user.id)
    lists = List.objects.filter(user=request.user.id)
    result_list = list(chain(notes, lists))
    print(result_list)

    context = {
        "list_of_notes": notes,
        "list_of_lists": lists,

    }
    return render(request, "App/main_view.html", context=context)

def delete_note(request, note_id):
    note = Note.objects.filter(pk=note_id)
    note.delete()
    return redirect(reverse("App:main_view"))


def edit_note(request,note_id):
    note = Note.objects.get(pk=note_id)
    print(note)
    context = {
        "note": note,
        "title": note.title,
        "category": note.category,
        "content": note.content,
    }
    if request.method == "POST":
        note.title = request.POST["title"]
        note.category = request.POST["category"]
        note.content = request.POST["content"]
        note.save()
        return redirect(reverse("App:main_view"))
    return render(request, "App/create_note.html", context=context)