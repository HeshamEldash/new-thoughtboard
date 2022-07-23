from django.db import models
from django.contrib.auth.models import User

class List(models.Model):
    title = models.CharField(max_length=250)
    category = models.CharField(max_length=300, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class ListItem(models.Model):
    item = models.TextField(max_length=500)
    parent_list = models.ForeignKey(List, on_delete=models.CASCADE)


    def __str__(self):
        return self.item


class Note(models.Model):
    title = models.CharField(max_length=250)
    content  = models.TextField(max_length=100000)
    category = models.CharField(max_length=300, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title




