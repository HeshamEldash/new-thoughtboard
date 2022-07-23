from django.contrib import admin
from .models import List, ListItem, Note
# Register your models here.

admin.site.register(List)
admin.site.register(ListItem)
admin.site.register(Note)