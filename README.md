# Project JWT - Spring Boot Authentication

Một ứng dụng Spring Boot hoàn chỉnh với xác thực JWT, OTP, và quản lý người dùng.

## Tính năng

- Xác thực JWT (JSON Web Tokens)
- Xác thực OTP qua Email
- Đăng ký và Đăng nhập người dùng
- Quản lý Role và Quyền
- Gửi Email cho OTP

## Công nghệ sử dụng

- **Backend**: Spring Boot 3.x
- **Database**: JPA/Hibernate
- **Security**: JWT, Spring Security
- **Build**: Maven
- **Email**: SMTP

## Yêu cầu hệ thống

- Java 17+
- Maven 3.8+
- MySQL/PostgreSQL (tùy cấu hình)

## Cấu trúc Project

```
backend/
├── src/main/java/com/example/Project_JWT/
│   ├── config/          # Cấu hình ứng dụng
│   ├── controller/      # REST Controllers
│   ├── dto/             # Data Transfer Objects
│   ├── entity/          # JPA Entities
│   ├── repository/      # Data Access Layer
│   ├── service/         # Business Logic
│   └── util/            # Utility Classes
├── src/main/resources/
│   ├── application.yml  # Cấu hình chính
│   └── application.properties
└── pom.xml             # Maven Dependencies
```

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/NguyenHieuDavitDev/Spring-boot.git
cd Project-JWT
```

2. Cấu hình Database và Email trong `application.yml`

3. Build project:
```bash
mvn clean install
```

4. Chạy ứng dụng:
```bash
mvn spring-boot:run
```

## Sử dụng API

### Đăng ký
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

### Đăng nhập
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

### Xác thực OTP
```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

## Cấu hình Email

Cập nhật trong `application.yml`:
```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password
```

## Phát triển

- **IDE**: IntelliJ IDEA / Eclipse / VS Code
- **Version Control**: Git
- **Build**: Maven

## Liên hệ

- Author: NguyenHieuDavitDev
- Repository: https://github.com/NguyenHieuDavitDev/Spring-boot.git

