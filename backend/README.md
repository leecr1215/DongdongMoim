## Backend 실행방법 
```shell
./manage.py makemigrations dongdongapp   
./manage.py migrate    
./manage.py createsuperuser    
./manage.py runserver 8080   
```
## API Documentation 

### USER

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

### POSTS

1) 전체 게시글 조회   
[GET] `localhost:8080/api/v1/posts/all`   

2) 게시글 조회   
[GET] `localhost:8080/api/v1/posts/{post_id}`   

3) 게시글 작성   
[POST] `localhost:8080/api/v1/posts`   
[RequestBody]    
    ```shell
    {
            "post_id": 1,
            "user_id": 2,
            "title": "This is the title",
            "content": "This is content",
            "location": "Deajeon",
            "meeting_date": "2022-05-07T15:19:27.340471Z",
            "post_date": "2022-05-07T14:56:47.933953Z",
            "required_number": 5,
            "gender": "F",
            "exercise": "badminton",
            "exercise_skil": 2
    }
    
4) 게시글 수정   
[PUT] `localhost:8080/api/v1/posts/{post_id}`   
[RequestBody]    
    ```shell
    {
            "post_id": 1,
            "user_id": 2,
            "title": "This is new title",
            "content": "This is new content",
            "location": "Deajeon",
            "meeting_date": "2022-05-07T15:19:27.340471Z",
            "post_date": "2022-05-07T14:56:47.933953Z",
            "required_number": 5,
            "gender": "F",
            "exercise": "badminton",
            "exercise_skil": 2
    }
    ```
