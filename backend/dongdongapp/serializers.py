from datetime import datetime
from rest_framework import  serializers
from .models import CustomUser, Post
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions

# 사용자 정보 생성 
class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    class Meta:
        model = CustomUser
        fields = ('id','username','password','gender','phone_number','age','soccer_skill','baseball_skill','badminton_skill')
        extra_kwargs = {'password': {'write_only': True}, 'phone_number': {'write_only': True} }

# 사용자 정보 수정 및 조회 
class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('id','username','gender','phone_number','age','soccer_skill','baseball_skill','badminton_skill')
        extra_kwargs = { ## 유효성 검사에서 제외 
            'username': {'validators': []},
        }
        
# jwt token 결과 커스텀 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # response 커스텀 
    default_error_messages = {
        'no_active_account': {'message':'username or password is incorrect!',
                              'success': False,
                              'status' : 401}
    }
        
    def validate(self, attrs):
        data = super().validate(attrs)
        
        refresh = self.get_token(self.user)
        
         # Add extra responses here
        data['username'] = self.user.username
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['success'] = True
        
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class PostSerializer(serializers.ModelSerializer):

    # def update(self, instance, validated_data):
    #     instance.title = validated_data("title", instance.title)
    #     instance.content = validated_data("content", instance.content)
    #     instance.location = validated_data("location", instance.location)
    #     instance.meeting_date = validated_data("meeting_date", instance.meeting_date)
    #     instance.post_date = datetime.now()
    #     instance.required_number = validated_data("required_number", instance.required_number)
    #     instance.gender = validated_data("gender", instance.gender)
    #     instance.exercise = validated_data("exercise", instance.exercise)
    #     instance.exercise_skil = validated_data("exercise_skil", instance.exercise_skil)
    #     return instance


    class Meta:
        model = Post
        fields = ('post_id','user_id','title','content','location','meeting_date', 'post_date','required_number','gender','exercise','exercise_skil')