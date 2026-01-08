# Hệ thống quản lý thông tin sinh viên đơn giản

## Mô tả dự án

dự án quản lý thông tin sinh viên được phát triển cung cấp các chức năng cơ bản để quản lý dữ liệu sinh viên. Dự án sử dụng kiến trúc client-server với backend được xây dựng trên Spring Boot và frontend sử dụng Next.js, cho phép các người dùng thực hiện các thao tác Create, Read, Update và Delete (CRUD) trên thông tin sinh viên.

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
- Tạo mới hồ sơ sinh viên với thông tin cơ bản (tên, tuổi, email)
- Cập nhật thông tin sinh viên hiện có
- Xóa mềm dữ liệu sinh viên (soft delete)

### Quản lý tệp đính kèm
- Hỗ trợ tải lên hình ảnh đại diện cho sinh viên
- Lưu trữ tệp trên server trong thư mục uploads
- Hiển thị hình ảnh trong giao diện người dùng

## Cấu trúc dự án

```
students/
├── src/
│   ├── main/
│   │   ├── java/com/example/CURD_students/
│   │   │   ├── controller/      (Xử lý các yêu cầu HTTP)
│   │   │   ├── service/         (Chứa logic nghiệp vụ)
│   │   │   ├── repository/      (Truy cập dữ liệu từ cơ sở dữ liệu)
│   │   │   ├── model/           (Các entity đại diện cho bảng dữ liệu)
│   │   │   ├── dto/             (Data Transfer Object)
│   │   │   └── config/          (Cấu hình ứng dụng)
│   │   └── resources/           (Tệp cấu hình, static resources)
│   └── test/                    (Các bài kiểm thử đơn vị)
├── frontend/
│   ├── app/
│   │   ├── components/          (Các component React có thể tái sử dụng)
│   │   ├── create/              (Trang tạo mới hồ sơ sinh viên)
│   │   ├── edit/                (Trang chỉnh sửa thông tin sinh viên)
│   │   └── lib/                 (Các hàm tiện ích, API client)
│   └── public/                  (Các tài nguyên tĩnh công khai)
├── uploads/                     (Thư mục lưu trữ hình ảnh đại diện)
└── pom.xml                      (Cấu hình Maven cho backend)
```

## Mô hình dữ liệu

### Entity Student
| Trường | Kiểu dữ liệu | Mô tả |
|--------|-------------|-------|
| id | Long | Mã định danh duy nhất, tự động tăng |
| name | String | Tên sinh viên |
| age | int | Tuổi sinh viên |
| email | String | Địa chỉ email liên lạc |
| avatar | String | Đường dẫn hình ảnh đại diện |
| deleted | boolean | Trạng thái xóa mềm (mặc định: false) |

## API Endpoints

### Lấy dữ liệu
- `GET /students` - Lấy danh sách toàn bộ sinh viên chưa bị xóa
- `GET /students/{id}` - Lấy thông tin chi tiết sinh viên theo mã định danh

### Tạo mới
- `POST /students` - Tạo mới hồ sơ sinh viên (hỗ trợ upload hình ảnh)
  - Content-Type: `multipart/form-data`
  - Tham số: name, age, email, avatar (tệp)

### Cập nhật
- `PUT /students/{id}` - Cập nhật thông tin sinh viên (hỗ trợ thay đổi hình ảnh)
  - Content-Type: `multipart/form-data`
  - Tham số: name, age, email, avatar (tùy chọn)

### Xóa
- `DELETE /students/{id}` - Xóa mềm hồ sơ sinh viên (không xóa vĩnh viễn)

## Cấu hình CORS

Backend được cấu hình để chấp nhận yêu cầu từ frontend chạy tại `http://localhost:3000`, cho phép giao tiếp an toàn giữa hai thành phần của ứng dụng thông qua annotation `@CrossOrigin`.

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
1. Điều chỉnh cấu hình kết nối cơ sở dữ liệu trong `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. Chạy lệnh Maven để biên dịch và khởi chạy:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Server sẽ chạy tại `http://localhost:8080`

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
   Ứng dụng sẽ chạy tại `http://localhost:3000`

## Quy trình làm việc

1. Người dùng truy cập giao diện web frontend
2. Frontend gửi yêu cầu HTTP đến backend API
3. Backend xử lý yêu cầu, thao tác với cơ sở dữ liệu MySQL
4. Backend trả về kết quả JSON
5. Frontend nhận dữ liệu và cập nhật giao diện người dùng

## Tính năng nổi bật

- **Giao diện thân thiện**: Sử dụng Tailwind CSS để tạo giao diện hiện đại
- **Xóa mềm**: Dữ liệu được đánh dấu là đã xóa thay vì xóa vĩnh viễn
- **Upload hình ảnh**: Hỗ trợ tải lên và hiển thị hình ảnh đại diện
- **Validation**: Kiểm tra dữ liệu đầu vào trên cả frontend và backend
- **RESTful API**: Tuân theo chuẩn REST trong thiết kế API

## Result

## frontend
<img width="1428" height="761" alt="Screenshot 2026-01-08 at 15 55 23" src="https://github.com/user-attachments/assets/ce45b416-0ac6-44f6-8e3b-87be327cafe5" />

## backend
<img width="845" height="687" alt="Screenshot 2026-01-08 at 15 57 09" src="https://github.com/user-attachments/assets/b376f517-df92-4a0c-bfde-35f5f1ed97f4" />
