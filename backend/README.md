## Backend 실행방법 
```shell
./manage.py makemigrations dongdongapp   
./manage.py migrate    
./manage.py createsuperuser    
./manage.py runserver 8080   
```
## Database reset  
  
1) db.sqlite3 삭제
```shell
    cd backend  
    rm db.sqlite3  
```  
  
2) migrations 삭제
```shell
    cd migrations  
    rm 000*  
    rm -rf __pycache__  
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
        "basketball_skill":1
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
[GET] `localhost:8080/api/v1/users/{user_id}`   
   
4) 사용자 정보 수정    
[PUT] `localhost:8080/api/v1/users/{user_id}`     
[RequestBody]    
    ```shell
    {   
        "username":"test",
        "gender":"F",
        "phone_number":"010-1234-5678",
        "age":23,
        "soccer_skill":2,
        "baseball_skill":1,
        "basketball_skill":4
    }
    ```

### POST

1) 전체 게시글 조회   
[GET] `localhost:8080/api/v1/posts/all`   

2) 게시글 필터링 조회  
[GET] `localhost:8080/api/v1/posts/all?id={user_id}age={age}&gender={gender}&skil={skill}`  
    
  
3) 게시글 작성   
[POST] `localhost:8080/api/v1/posts`   
[RequestBody]    
    ```shell
    {
            "user_id": 3,
            "title": "hello there",
            "content": "hellooooo",
            "location": "Deajeon",
            "meeting_date": "2022-05-09T09:12:14.558914Z",
            "post_date": "2022-05-09T09:12:14.558914Z",
            "required_number": 5,
            "age": 23,
            "gender": "F",
            "exercise": "basketball",
            "exercise_skill": 2
    }

4) 게시글 조회   
[GET] `localhost:8080/api/v1/posts/{post_id}`   
  
5) 사용자별 작성한 게시글 조회  
[GET] `localhost:8080/api/v2/posts/{user_id}`  
  
6) 게시글 수정   
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
            "age": 23,
            "gender": "F",
            "exercise": "basketball",
            "exercise_skill": 2
    }
    ```

### COMMENT 
1) 댓글 작성      
[POST] `localhost:8080/api/v1/comments`   
[RequestBody]     
    ```shell   
    {
      "user_id":1,
      "post_id":1,
      "text":"hihi",
      "created_date":"2022-02-11 12:11"
    }   
    ```  
2) 게시물 별 댓글 조회   
[GET] `localhost:8080/api/v1/posts/{post_id}/comments`   


### PostApplication    
1) 게시물 별 지원자 조회      
[GET] `localhost:8080/api/v1/posts/{post_id}/applicants`   

2) 사용자의 게시물 신청 여부 조회    
[GET] `localhost:8080/api/v1/posts/{post_id}/applicants/{user_id}`  

3) 사용자의 게시물 신청    
[POST] `localhost:8080/api/v1/posts/{post_id}/applicants/{user_id}`  
[RequestBody]    
    ```shell  
    
    ```

4) 사용자의 게시물 신청 취소    
[DELETE] `localhost:8080/api/v1/posts/{post_id}/applicants/{user_id}`  
   
### Friend   
1) 친구 요청    
[POST] `localhost:8080/api/v1/friends`   
[RequestBody]   
    ```shell
    {
      "my_id":1,
      "your_id":2,
      "status":"REQUEST" //필수 
    }
    ```
2) 친구 취소    
[DELETE] `localhost:8080/api/v1/friends/{my_id}/{your_id}`   

3) 나의 친구목록 조회   
[GET] `localhost:8080/api/v2/friends/{my_id}`    
+) (friend_username,phone_number} object의 리스트 형태    

4) 친구 수락    
[PUT] `localhost:8080/api/v1/friends/{my_id}/{your_id}`   

5) 친구 관계 여부   
[GET] `localhost:8080/api/v1/friends/connection/{my_id}/{your_id}`   
+) result의 status : **NONE, REQUEST, REQUESTED, CONNECTING**

### [Response Body]   
  ```shell
    {
        "success": true,
        "result": [~~~],
        "status": 201
    }
```   
