from django.contrib import admin
from .models import ApiList, ApiNote, ApiListItem, ApiCategory
# Register your models here.

admin.site.register(ApiList)
admin.site.register(ApiListItem)
admin.site.register(ApiNote)
admin.site.register(ApiCategory)