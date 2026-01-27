import { API_BASE_URL } from "../api/studentApi";

interface Props {
  imageUrl?: string;
  file?: File;
}

export default function ImagePreview({ imageUrl, file }: Props) {
  let src: string;

  if (file) {
    // Ưu tiên preview file người dùng vừa chọn
    src = URL.createObjectURL(file);
  } else if (imageUrl) {
    // Nếu backend trả full URL thì dùng luôn
    if (imageUrl.startsWith("http")) {
      src = imageUrl;
    } else if (imageUrl.startsWith("/uploads/")) {
      // Backend trả path tương đối /uploads/xxx
      src = `${API_BASE_URL}${imageUrl}`;
    } else if (imageUrl.startsWith("uploads/")) {
      // Backend trả path tương đối uploads/xxx
      src = `${API_BASE_URL}/${imageUrl}`;
    } else {
      // Nếu chỉ là tên file, tự build URL tới backend
      src = `${API_BASE_URL}/uploads/${imageUrl}`;
    }
  } else {
    // Fallback ảnh mặc định (dùng luôn icon có sẵn của Vite)
    src = "/vite.svg";
  }

  return (
    <img
      src={src}
      className="img-circle elevation-2"
      style={{
        width: 45,
        height: 45,
        objectFit: "cover",
        borderRadius: "50%",
      }}
      alt="avatar"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/vite.svg";
      }}
    />
  );
}
