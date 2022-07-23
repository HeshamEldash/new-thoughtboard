from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['fName'] = user.first_name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', "POST"])
def register(request):
    if request.method == "POST":
        data = request.data
        user_serializer = ApiUserSerializer(data=data)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            print(user_serializer.errors)
            print("not worked")
    return Response({"reg":"reg"})


@api_view(["GET"])
def home(requst):
    routes = [
        {"test": "testing"}
    ]
    return Response(routes)

@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def get_api_lists(request, user_id):

    if request.method == "GET":
        lists = ApiList.objects.filter(user=user_id)
        list_serializer = ApiListSerializer(lists, many=True)
        return Response(list_serializer.data)

    elif request.method =="POST":
        list_serializer = ApiListSerializer(data= request.data)
        if list_serializer.is_valid():
            list_serializer.save()
            return Response(list_serializer.data, status=status.HTTP_201_CREATED)
        print(list_serializer)
        return Response(list_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
def get_api_list(request, pk):
    try:
        list = ApiList.objects.get(pk=pk)
    except ApiList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        list_serializer = ApiListSerializer(list, many=False)
        return Response(list_serializer.data)

    elif request.method == "PUT":
        list_serializer = ApiListSerializer(list, data=request.data)
        if list_serializer.is_valid():
            list_serializer.save()
            list.save()
            return Response(list_serializer.data)
        return Response(list_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def get_api_listItem(request, pk):
    try:
        listItem = ApiListItems.objects.get(pk=pk)
    except ApiList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def get_api_notes(request, user_id):
    if request.method == "GET":
        notes = ApiNote.objects.filter(user=user_id)
        note_serializer = ApiNoteSerializer(notes, many=True)

        return Response(note_serializer.data)

    elif request.method == "POST":
        note_serializer = ApiNoteSerializer(data=request.data)
        if note_serializer.is_valid():
            note_serializer.save()
            return Response(note_serializer.data, status=status.HTTP_201_CREATED)
        return Response(note_serializer.errors,status=status.HTTP_400_BAD_REQUEST)






@api_view(["GET","PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def api_note_details(request, pk):
    try:
        note = ApiNote.objects.get(pk= pk)
    except ApiNote.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        note_serializer = ApiNoteSerializer(note, many=False)
        return Response(note_serializer.data)
    elif request.method == "PUT":
        note_serializer = ApiNoteSerializer(note, data=request.data)
        if note_serializer.is_valid():
            note_serializer.save()
            return Response(note_serializer.data)
        return Response(note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






