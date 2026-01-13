# Hướng dẫn cài đặt Font Awesome

## Vấn đề
Các package Font Awesome chưa được cài đặt vào `node_modules`, gây ra lỗi "Module not found".

## Giải pháp

### Cách 1: Cài đặt thủ công (Khuyến nghị)

Mở terminal và chạy lệnh sau trong thư mục `frontend`:

```bash
cd frontend
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome --legacy-peer-deps
```

### Cách 2: Sử dụng script

```bash
cd frontend
chmod +x install-fontawesome.sh
./install-fontawesome.sh
```

### Cách 3: Cài đặt tất cả dependencies

```bash
cd frontend
npm install
```

## Sau khi cài đặt

Khởi động lại development server:

```bash
npm run dev
```

## Kiểm tra cài đặt thành công

Nếu cài đặt thành công, bạn sẽ thấy thư mục:
- `node_modules/@fortawesome/fontawesome-svg-core`
- `node_modules/@fortawesome/free-solid-svg-icons`
- `node_modules/@fortawesome/react-fontawesome`

## Lưu ý

- Nếu gặp lỗi quyền (EPERM), thử chạy với `sudo` (macOS/Linux) hoặc mở terminal với quyền Administrator (Windows)
- Nếu vẫn gặp lỗi, thử xóa `node_modules` và `package-lock.json` rồi cài đặt lại:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
