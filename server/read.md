#Nest project
1. install: 
+ npm i -g @nestjs/cli
+ nest new project-tap

2. install database mongodb:
+ npm i @nestjs/mongoose mongoose

3. CRUD generator 
+ nest g resource modules/auth --no-spec

4. .env
+ npm i --save @nestjs/config

5. validator
+ npm i --save class-validator class-transformer

6. test api ui
+ npm install --save @nestjs/swagger swagger-ui-express

7. pagination:
+ npm i api-query-params
https://www.npmjs.com/package/api-query-params

8. auth
+ npm i @nestjs/jwt

https://stackoverflow.com/questions/54308318/how-to-get-the-configurations-from-within-a-module-import-in-nestjs

https://www.uuidgenerator.net/


9. passport, Guard
npm install --save @nestjs/passport passport passport-local

npm install --save-dev @types/passport-local

+ token

 npm install --save @nestjs/jwt passport-jwt

 npm install --save-dev @types/passport-jwt

 + global guard:

10. generate idcode
npm i uuid

11. mailer
npm install --save @nestjs-modules/mailer nodemailer

npm install --save handlebars

npm i --save-dev @types/nodemailer
 

 https://nest-modules.github.io/mailer/docs/mailer.html


 *********
 🧩 Cấu trúc từng module (chức năng + model)
1. auth/
Chức năng: Đăng ký, đăng nhập, Google login, middleware xác thực
2. user/
Chức năng: Thông tin người dùng, cập nhật profile, avatar
3. workspace/
Chức năng: Tạo workspace, mời thành viên, phân quyền
4. board/
Chức năng: Tạo board trong workspace (giống Trello board)
5. task/
Chức năng: Tạo task, kéo thả, gán tag, gán người, chỉnh sửa
6. taskList/ (có thể tách module riêng nếu phức tạp)
Chức năng: To do / In progress / Done
7. comment/
Chức năng: Gửi comment, mention người
8. notification/
Chức năng: Gửi thông báo khi có ai gán task, comment, tag, v.v.
9. socket/
Chức năng: WebSocket Gateway — xử lý các sự kiện như:

taskUpdated, taskMoved

newComment, userTyping

boardUpdated, listUpdated

Dùng thư viện: @nestjs/websockets + socket.io




