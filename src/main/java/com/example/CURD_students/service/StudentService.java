package com.example.CURD_students.service;

import com.example.CURD_students.dto.StudentRequest;
import com.example.CURD_students.model.Student;
import com.example.CURD_students.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    // thư mục uploads nằm ngoài tomcat
    private static final String UPLOAD_DIR = "uploads";

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findByDeletedFalse();
    }

    public Student getById(Long id) {
        return repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

//    public Student create(Student student, MultipartFile avatar) throws IOException {
//
//        if (avatar != null && !avatar.isEmpty()) {
//
//            // tạo thư mục nếu chưa tồn tại
//            Path uploadPath = Paths.get(UPLOAD_DIR);
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            String fileName = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
//            Path filePath = uploadPath.resolve(fileName);
//
//            // ghi file
//            Files.copy(avatar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            student.setAvatar(fileName);
//        }
//
//        return repository.save(student);
//    }

    public Student create(StudentRequest request) throws IOException {
        Student student = new Student();
        student.setName(request.getName());
        student.setAge(request.getAge());
        student.setEmail(request.getEmail());

        MultipartFile avatar = request.getAvatar();

        if (avatar != null && !avatar.isEmpty()) {
            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(
                    avatar.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            student.setAvatar(fileName);
        }

        return repository.save(student);
    }


    public void softDeleted(Long id) {
        Student student = getById(id);
        student.setDeleted(true);
        repository.save(student);
    }
}
