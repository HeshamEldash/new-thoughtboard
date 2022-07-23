from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *



class ApiUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data["email"],
            email= validated_data["email"],
            password=validated_data["password"]
        )

        return user


class ApiListItemSerializer(ModelSerializer):
    """ have to exclude the parent list field from the serlizer in order to be able to
    assign it a value in the ApiListSerializer wihtout having to send it in the reuest
    otherwise validated data will not be passed as there is a missing field.

    The ID field is added so it can be accessed in the Request information in the ApiList Update method to use
    it to get the list item forom the DB

    """

    id = serializers.IntegerField(required=False)

    class Meta:
        model = ApiListItem
        exclude= ["parent_list"]
        extra_kwargs = {
            'id': {'read_only': False, 'required': True},
            'item': {'default':""}
                        }


class ApiListSerializer(ModelSerializer):
    """ This is called nested serlizer, child serlizer is nested inside the parent
        The create method decides what happen when the .save() method is called
        The update method decides what happens on update
    """
    items = ApiListItemSerializer(many=True)

    class Meta:
        model = ApiList
        fields = "__all__"
        extra_kwargs = {
            'title': {'default': "", 'allow_null': True, "allow_blank":True },
            'category': {'default': ""},
            'parent_api_category': {'allow_null': True},
        }

    def create(self, validated_data):
        list_item_data = validated_data.pop("items")
        api_list = ApiList.objects.create (**validated_data)
        for item in list_item_data:
            ApiListItem.objects.create(parent_list= api_list,**item)
        return api_list

    def update(self, instance, validated_data):
        """ the instance is the current item.
            The validated data is the request data
            to get the children of the instance from the db use 'instance.items.all()'
            The code below checks if the item is in the db but not in the request and in that case it gets delted to update it

            So basically each request data update the list items in bulk
        """

        req_list_item_data = validated_data.get("items")

        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        instance.parent_api_category = validated_data.get('parent_api_category', instance.parent_api_category)

        db_list_items = instance.items.all()
        id_list = []

        for item in req_list_item_data:
            item_id = item.get("id", None)
            id_list.append(item_id)
            if item_id:
                try:
                    list_item = instance.items.get(id=item_id)
                    list_item.item = item.get("item")
                    list_item.checked = item.get("checked")
                    list_item.save()
                except ApiListItem.DoesNotExist:
                    instance.items.create(**item)


            # else:
            #     # ApiListItem.objects.create(parent_list=instance ,**item)
            #     instance.items.create(**item)
            #     print(instance.items)
            #     print(f"item created")
            #     print(item)
        for item in db_list_items:

            if item.id not in id_list:
                item.delete()
                print(f"item deleted")


        return instance






class ApiNoteSerializer(ModelSerializer):
    # date_created = serializers.DateTimeField()
    class Meta:
        model = ApiNote
        fields = "__all__"
        extra_kwargs = {
            'title': {'allow_blank': True},
            'content': {'allow_blank': True},
            'category': {'allow_blank': True}
                        }