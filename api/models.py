
# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class ApiCategory(models.Model):
    api_category = models.CharField(max_length=300, null=False)
    def __str__(self):
        return self.api_category

class ApiList(models.Model):
    title = models.CharField(max_length=250, null=True)
    category = models.CharField(max_length=300, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_api_category = models.ForeignKey(ApiCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

class ApiListItem(models.Model):
    item = models.TextField(max_length=500, blank=True)
    checked = models.BooleanField(default=False)
    parent_list = models.ForeignKey(ApiList,related_name= "items", on_delete=models.CASCADE)

    def __str__(self):
        return self.item


class ApiNote(models.Model):
    title = models.CharField(max_length=250,null=True)
    content  = models.TextField(max_length=100000, null=True)
    category = models.CharField(max_length=300, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_api_category = models.ForeignKey(ApiCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title



