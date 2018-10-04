# Demo

#### A little demo project
---
## Setup test environment

### Download the project
```bash
$ git clone git@github.com:slowHsu/Demo.git
$ cd Demo
```
### Install dependent modules
```bash
$ npm install
```
### Lunch a MySQL database ###
  Create a MySQL database name "demo" in you environment.

### Modify config ###
 - Change the mysql config for environment.  
    ```bash
    $ vim configs\mysql.js
    ```

## Start service
```bash
$ node app.js
```
---
## APIs

### 1. Create User
- Url:
    >    http://[target-IP]:[port]/user
- Method: POST
- Header: "Content-Type: application/json"
- Request Parameters: (Json format) 
    >    name: {$name} //alphanumeric  

- Request example (curl):
    ```
    $ curl -i -X POST -H "Content-Type: application/json" -d '{"name":"Test"}' http://localhost:8889/user
    ```
- Response Parameters: (Json format)
    >     success/error: boolean  
    >     message: "message"  
    >     id: {$userId}  

    - (200 Success)  
        - Success create user  
        - Duplicate user
    - (400 Bad Request)
    - (500 Internal Server Error)
- Response example:
    > {  
    >    "success": true,  
    >    "message": "Success create user: Test",  
    >    "id": 1  
    > }

### 2. Post article
- Url:
    >    http://[target-IP]:[port]/user/post
- Method: POST
- Header: "Content-Type: application/json"
- Request Parameters: (Json format)  
    >    userId: {$userId} //number  
    >    title: ${title}  //alphanumeric  
    >    content: {$content}  //text  

- Request example (curl):
    ```
    $ curl -i -X POST -H "Content-Type: application/json" -d '{"userId":3, "title":"Test Post", "content":"test content"}" http://localhost:8889/user/post
    ```
- Response Parameters: (Json format) 
    >     success/error: boolean  
    >     message: "message"  
    >     id: {$postId}  

    - (200 Success)  
    - (400 Bad Request)
        - Illegal character
        - Invalid user
    - (500 Internal Server Error)
- Response example:
    > {  
    >    "success": true,  
    >    "message": "Success post: Test Post",  
    >    "id": 1  
    > }

### 3. Like a post
- Url:
    >    http://[target-IP]:[port]/user/like
- Method: POST
- Header: "Content-Type: application/json"
- Request Parameters: (Json format) 
    >    userId: {$userId} //number  
    >    postId: ${postId}  //number  

- Request example (curl):
    ```
    $ curl -i -X POST -H "Content-Type: application/json" -d '{"userId":3, "postId":1}' http://localhost:8889/user/like
    ```
- Response Parameters: (Json format) 
    >     success/error: boolean  
    >     message: "message"  
    >     id: {$likeId}  

    - (200 Success)  
    - (400 Bad Request)
        - Illegal character
        - Invalid userId
        - Invalid postId
    - (500 Internal Server Error)
- Response example:
    > {  
    >    "success": true,  
    >    "message": "Success.",  
    >    "id": 3  
    > }

### 4. Get all posts of a specific user
- Url:
    >    http://[target-IP]:[port]/user/post
- Method: GET
- Header: "Content-Type: application/json"
- Request Parameters: (Json format) 
    >    userId: {$userId} //number  

- Request example (curl):
    ```
    $ curl -i -X GET -H "Content-Type: application/json" -d '{"userId":3}' http://localhost:8889/user/post
    ```
- Response Parameters: (Json format) 
    >     success/error: boolean  
    >     message: "message"  
    >     posts: [{
    >        postId: {$postId},
    >        title: {$title},
    >        content: {$content}
    >     }]

    - (200 Success)  
    - (400 Bad Request)
        - Illegal character
    - (500 Internal Server Error)
- Response example:
    > {  
    >    "success": true,  
    >    "message": "Success.",  
    >    "posts": [  
    >        {"postId":2,"title":"Test Post 1","content":"test"},  
    >        {"postId":4,"title":"Test Post 2","content":"test"}  
    >    ] 
    > }

### 5. Get users who like a specific post
- Url:
    >    http://[target-IP]:[port]/post/like
- Method: GET
- Header: "Content-Type: application/json"
- Request Parameters: (Json format) 
    >    postId: {$postId} //number  

- Request example (curl):
    ```
    $ curl -i -X GET -H "Content-Type: application/json" -d '{"postId":1}' http://localhost:8889/post/like
    ```
- Response Parameters: (Json format) 
    >     success/error: boolean  
    >     message: "message"  
    >     likes: [{
    >        name: {$name}
    >     }]

    - (200 Success)  
    - (400 Bad Request)
        - Illegal character
    - (500 Internal Server Error)
- Response example:
    > {  
    >    "success": true,  
    >    "message": "Success.",  
    >    "likes": [  
    >       {"name":"Test1"},  
    >       {"name":"Test2"}  
    >    ]  
    > }

## Contact
##### Author: Linda.MJ.Hsu
##### Email: slowlock596@gmail.com