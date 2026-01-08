# Quản lý thông tin sinh viên Đơn giản

## Mô tả dự án

Project quản lý thông tin sinh viên là một ứng dụng web phát triển để cung cấp các chức năng cơ bản để quản lý dữ liệu sinh viên. Dự án sử dụng kiến trúc client-server với backend được xây dựng trên Spring Boot và frontend sử dụng Next.js, cho phép các người dùng thực hiện các thao tác Create, Read, Update và Delete (CRUD) trên thông tin sinh viên.

## Công nghệ sử dụng

### Backend
- **Framework**: Spring Boot 4.0.1
- **Ngôn ngữ**: Java 25
- **Database**: MySQL
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Thư viện hỗ trợ**: Lombok (giảm mã boilerplate)

### Frontend
- **Framework**: Next.js 16.1.1
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: Thư viện biểu tượng FontAwesome
- **Build Tool**: npm

## Tính năng chính

### Quản lý thông tin sinh viên
- Xem danh sách toàn bộ sinh viên
- Xem chi tiết thông tin sinh viên theo mã định danh
- Tạo mới hồ sơ sinh viên với thông tin cơ bản
- Cập nhật thông tin sinh viên hiện có
- Xóa mềm dữ liệu sinh viên (soft delete)

### Quản lý tệp đính kèm
- Hỗ trợ tải lên hình ảnh đại diện cho sinh viên
- Lưu trữ tệp tệp tệp trên server

## Cấu trúc dự án

```
CURD-students/
├── src/
│   ├── main/
│   │   ├── java/com/example/CURD_students/
│   │   │   ├── controller/      (Xử lý các yêu cầu HTTP)
│   │   │   ├── service/         (Tư vấn logic nghiệp vụ)
│   │   │   ├── repository/      (Truy cập dữ liệu)
│   │   │   ├── model/           (Các entity của cơ sở dữ liệu)
│   │   │   ├── dto/             (Data Transfer Object)
│   │   │   └── config/          (Cấu hình ứng dụng)
│   │   └── resources/           (Tệp cấu hình, static resources)
│   └── test/                    (Các bài kiểm thử đơn vị)
├── frontend/
│   ├── app/
│   │   ├── components/          (Các component React)
│   │   ├── create/              (Trang tạo mới sinh viên)
│   │   ├── edit/                (Trang chỉnh sửa sinh viên)
│   │   └── lib/                 (Các hàm tiện ích và API client)
│   └── public/                  (Các tài nguyên tĩnh công khai)
└── pom.xml                      (Cấu hình Maven)
```

## Mô hình dữ liệu

### Entity Student
- **id**: Mã định danh duy nhất (Long, auto-increment)
- **name**: Tên sinh viên (String)
- **age**: Tuổi sinh viên (int)
- **email**: Địa chỉ email (String)
- **avatar**: Đường dẫn hình ảnh đại diện (String)
- **deleted**: Trạng thái xóa mềm (boolean)

## API Endpoints

### Lấy dữ liệu
- `GET /students` - Lấy danh sách toàn bộ sinh viên
- `GET /students/{id}` - Lấy thông tin chi tiết sinh viên theo mã định danh

### Tạo mới
- `POST /students` - Tạo mới hồ sơ sinh viên (hỗ trợ upload hình ảnh)

### Cập nhật
- `PUT /students/{id}` - Cập nhật thông tin sinh viên (hỗ trợ thay đổi hình ảnh)

### Xóa
- `DELETE /students/{id}` - Xóa mềm hồ sơ sinh viên


## Yêu cầu hệ thống

### Backend
- Java 25 hoặc cao hơn
- Maven 3.6+
- MySQL Server 5.7+

### Frontend
- Node.js 18.0+
- npm 9.0+

## Hướng dẫn cài đặt và chạy

### Cài đặt Backend
1. Điều chỉnh cấu hình kết nối cơ sở dữ liệu trong `src/main/resources/application.properties`
2. Chạy lệnh Maven để biên dịch và khởi chạy:
   ```bash
   mvn spring-boot:run
   ```

### Cài đặt Frontend
1. Điều hướng đến thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các dependencies:
   ```bash
   npm install
   ```
3. Chạy máy chủ phát triển:
   ```bash
   npm run dev
   ```

### Mục đích dự án
- Thực hành xây dựng REST API với Spring Boot
- Làm quen với Next.js và Tailwind CSS
- Hiểu cách xử lý upload file và CORS
- Áp dụng kiến thức Frontend và Backend trong một dự án hoàn chỉnh

## Tác giả
Nguyễn Hiếu
GitHub: https://github.com/NguyenHieuDavitDev
