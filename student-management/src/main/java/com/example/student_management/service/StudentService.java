package com.example.student_management.service;

import com.example.student_management.dto.request.StudentRequest;
import com.example.student_management.dto.response.StudentResponse;
import com.example.student_management.entity.Student;
import com.example.student_management.repository.StudentRepository;
import com.example.student_management.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repository;

    public List<StudentResponse> findAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public StudentResponse create(StudentRequest req, MultipartFile image) {
        String imageFileName = null;
        if (image != null && !image.isEmpty()) {
            imageFileName = FileUploadUtil.save(image);
        }

        Student student = Student.builder()
                .middleName(req.getMiddleName())
                .firstName(req.getFirstName())
                .cccd(req.getCccd())
                .gender(req.getGender())
                .dateOfBirth(req.getDateOfBirth())
                .status(req.getStatus())
                .imageUrl(imageFileName)
                .build();

        return toResponse(repository.save(student));
    }

    public StudentResponse update(Long id, StudentRequest req, MultipartFile image) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setMiddleName(req.getMiddleName());
        student.setFirstName(req.getFirstName());
        student.setCccd(req.getCccd());
        student.setGender(req.getGender());
        student.setDateOfBirth(req.getDateOfBirth());
        student.setStatus(req.getStatus());

        if (image != null && !image.isEmpty()) {
            String imageFileName = FileUploadUtil.save(image);
            student.setImageUrl(imageFileName);
        }

        return toResponse(repository.save(student));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private StudentResponse toResponse(Student s) {
        return StudentResponse.builder()
                .id(s.getId())
                .fullName(s.getMiddleName() + " " + s.getFirstName())
                .cccd(s.getCccd())
                .gender(s.getGender())
                .dateOfBirth(s.getDateOfBirth())
                .status(s.getStatus())
                .imageUrl(s.getImageUrl())
                .build();
    }
}