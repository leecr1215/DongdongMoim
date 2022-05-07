## Backend 실행방법 
```shell
./manage.py makemigrations dongdongapp   
./manage.py migrate    
./manage.py createsuperuser    
./manage.py runserver 8080   
```
## API Documentation 
1) 회원가입   
[POST] `localhost:8080/api/v1/users`   
[RequestBody]    
    ```shell
    {
        "username":"why",
        "password":"why",
        "gender":"F",
        "phone_number":"010-1234-5678",
        "age":23,
        "soccer_skill":1,
        "baseball_skill":1,
        "badminton_skill":1
    }
    ```
       
2) 로그인    
[POST] `localhost:8080/api/v1/token`   
[RequestBody]    
    ```shell
    {
        "username":"test",
        "password":"test"
    }
    ```   

3) 사용자 정보 조회    
[GET] `localhost:8080/api/v1/users/{id}`   
   
4) 사용자 정보 수정    
[PUT] `localhost:8080/api/v1/users/{id}`     
[RequestBody]    
    ```shell
    {   
        "username":"test",
        "gender":"F",
        "phone_number":"010-1234-5678",
        "age":23,
        "soccer_skill":2,
        "baseball_skill":1,
        "badminton_skill":4
    }
    ```
