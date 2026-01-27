# Student Management System

Hệ thống quản lý sinh viên được xây dựng với Spring Boot Backend và React Frontend, hỗ trợ quản lý thông tin học sinh toàn diện.

## Mục đích dự án

Ứng dụng này được thiết kế để:
- Quản lý thông tin chi tiết của học sinh (họ tên, email, số điện thoại, địa chỉ, giới tính, trạng thái)
- Upload và quản lý ảnh đại diện của học sinh
- Lọc và tìm kiếm học sinh theo các tiêu chí khác nhau
- Chỉnh sửa và xóa thông tin học sinh
- Xem chi tiết thông tin từng sinh viên

## Kiến trúc dự án

```
Students/
├── frontend/                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/      # React components (Form, Modal, Layout)
│   │   ├── pages/           # Trang chính StudentPage
│   │   ├── api/             # API client (axios)
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # CSS styling
│   ├── vite.config.ts       # Cấu hình Vite
│   └── package.json
│
└── student-management/      # Spring Boot Backend
    ├── src/main/java/com/example/student_management/
    │   ├── controller/      # REST API Controllers
    │   ├── service/         # Business Logic
    │   ├── repository/      # JPA Repositories
    │   ├── entity/          # Database Entities
    │   ├── dto/             # Data Transfer Objects
    │   ├── mapper/          # Entity-DTO Mapping
    │   ├── enums/           # Enums (Gender, StudentStatus)
    │   ├── config/          # Spring Configuration
    │   └── util/            # Utility Classes
    ├── src/main/resources/
    │   ├── application.yml  # Spring Boot Configuration
    │   └── application.properties
    ├── pom.xml             # Maven Dependencies
    └── uploads/            # Thư mục lưu ảnh upload
```

## Công nghệ sử dụng

### Backend
- **Framework**: Spring Boot 4.0.1
- **Java Version**: 25
- **Database**: SQL Server
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **CSS Framework**: Bootstrap 5.3.8
- **Icons**: Font Awesome 7.1.0
- **Form Management**: React Hook Form

## Dependencies chính

### Backend (pom.xml)
```xml
- spring-boot-starter-data-jpa
- spring-boot-starter-validation
- spring-boot-starter-webmvc
- mssql-jdbc (SQL Server Driver)
- Lombok (tùy chọn)
```

### Frontend (package.json)
```json
- react: ^19.2.0
- axios: ^1.13.3
- bootstrap: ^5.3.8
- react-hook-form: ^7.71.1
- @fortawesome/fontawesome-free: ^7.1.0
```

## Hướng dẫn cài đặt và chạy

### Yêu cầu tiên quyết
- Java 25+
- Node.js 16+ và npm
- SQL Server
- Maven

### Cấu hình Backend

1. **Tạo database SQL Server**
   ```sql
   CREATE DATABASE student_management;
   ```

2. **Cấu hình kết nối database** (`src/main/resources/application.yml`)
   ```yaml
   spring:
     datasource:
       url: jdbc:sqlserver://localhost:1433;databaseName=student_management
       username: sa
       password: your_password
       driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
     jpa:
       hibernate:
         ddl-auto: update
   ```

3. **Build Backend**
   ```bash
   cd student-management
   mvn clean install
   ```

4. **Chạy Backend**
   ```bash
   mvn spring-boot:run
   ```
   Backend sẽ chạy tại: `http://localhost:8080`

### Cấu hình Frontend

1. **Cài đặt dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Chạy development server**
   ```bash
   npm run dev
   ```
   Frontend sẽ chạy tại: `http://localhost:5173`

3. **Build production**
   ```bash
   npm run build
   ```

## Model dữ liệu

### Student Entity
```
- id: UUID
- fullName: String (Tên đầy đủ)
- email: String (Email)
- phoneNumber: String (Số điện thoại)
- address: String (Địa chỉ)
- gender: Enum (MALE, FEMALE, OTHER)
- status: Enum (ACTIVE, INACTIVE, GRADUATED, SUSPENDED)
- avatarUrl: String (Đường dẫn ảnh)
- createdAt: LocalDateTime
- updatedAt: LocalDateTime
```

## API Endpoints

### Quản lý học sinh
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/api/students` | Lấy danh sách tất cả học sinh |
| GET | `/api/students/{id}` | Lấy chi tiết học sinh |
| POST | `/api/students` | Tạo học sinh mới |
| PUT | `/api/students/{id}` | Cập nhật thông tin học sinh |
| DELETE | `/api/students/{id}` | Xóa học sinh |
| POST | `/api/students/{id}/upload-avatar` | Upload ảnh đại diện |

### Request/Response Examples

**Tạo học sinh mới**
```json
POST /api/students
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "phoneNumber": "0987654321",
  "address": "123 Đường ABC, Hà Nội",
  "gender": "MALE",
  "status": "ACTIVE"
}
```

## Components Frontend

### Components chính
- **StudentPage**: Trang quản lý chính với bảng danh sách học sinh
- **StudentForm**: Form để tạo/sửa thông tin học sinh
- **StudentFormModal**: Modal wrapper cho StudentForm
- **StudentDetailModal**: Modal hiển thị chi tiết học sinh
- **ImagePreview**: Component preview ảnh đại diện
- **ConfirmModal**: Modal xác nhận trước khi xóa

### Layout Components
- **AdminLayout**: Layout chính cho trang admin
- **Sidebar**: Menu bên trái
- **Topbar**: Thanh công cụ trên cùng

## CORS Configuration

Backend đã được cấu hình CORS để cho phép frontend kết nối:
```java
// CorsConfig.java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
    }
}
```

## Cấu trúc thư mục uploads

Ảnh đại diện của học sinh được lưu trong thư mục `student-management/uploads/` với tên file là UUID để tránh trùng lặp:
```
uploads/
├── 07905daa-cb28-4920-9b56-468c215cf950_avt.jpg
├── 1173f3fc-17d0-46c7-9442-b2ed87287839_avt.jpg
└── ...
```

## Testing

### Chạy unit tests Backend
```bash
cd student-management
mvn test
```

### Chạy linting Frontend
```bash
cd frontend
npm run lint
```

## Các file cấu hình quan trọng

### Backend
- `pom.xml`: Dependencies và build configuration
- `src/main/resources/application.yml`: Spring Boot configuration
- `src/main/java/config/`: Spring configuration classes

### Frontend
- `vite.config.ts`: Vite build configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: ESLint configuration
- `package.json`: Dependencies và scripts


---

**Phiên bản**: 0.0.1-SNAPSHOT  
**Cập nhật lần cuối**: January 2026
