from rest_framework import  serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    class Meta:
        model = CustomUser
        fields = ('id','username','password')
        extra_kwargs = {'password': {'write_only': True}}