# Hướng dẫn Setup và Chạy Backend

## Yêu cầu
- Java 25
- Maven
- MySQL Server

## Các bước setup

### 1. Khởi động MySQL

**Cách 1: Sử dụng script tự động**
```bash
cd backend
./start-mysql.sh
```

**Cách 2: Khởi động thủ công**
```bash
# Nếu cài qua Homebrew
brew services start mysql
# hoặc
mysql.server start

# Tạo database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS auth_db_spring CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**Cách 3: Nếu MySQL chưa được cài đặt**
```bash
# Cài đặt MySQL qua Homebrew
brew install mysql
brew services start mysql

# Tạo database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS auth_db_spring CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. Cấu hình Database

Kiểm tra file `src/main/resources/application.yml`:
- `username`: root (hoặc username MySQL của bạn)
- `password`: (để trống nếu không có password, hoặc nhập password của bạn)

### 3. Chạy Backend

```bash
cd backend
mvn spring-boot:run
```

Backend sẽ chạy trên: http://localhost:8080

## Kiểm tra MySQL đang chạy

```bash
# Kiểm tra port 3306
lsof -i :3306

# Hoặc kiểm tra process
ps aux | grep mysql
```

## Troubleshooting

### Lỗi: Connection refused
- Đảm bảo MySQL đang chạy: `mysql.server start` hoặc `brew services start mysql`
- Kiểm tra MySQL đang listen trên port 3306

### Lỗi: Access denied
- Kiểm tra username/password trong `application.yml`
- Thử đăng nhập MySQL: `mysql -u root -p`

### Lỗi: Unknown database
- Tạo database: `mysql -u root -e "CREATE DATABASE auth_db_spring;"`
