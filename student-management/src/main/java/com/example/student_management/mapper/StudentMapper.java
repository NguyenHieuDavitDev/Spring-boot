package com.example.student_management.mapper;

import com.example.student_management.dto.request.StudentRequest;
import com.example.student_management.dto.response.StudentResponse;
import com.example.student_management.entity.Student;

public class StudentMapper {

    public static Student toEntity(StudentRequest req) {
        return Student.builder()
                .middleName(req.getMiddleName())
                .firstName(req.getFirstName())
                .cccd(req.getCccd())
                .gender(req.getGender())
                .dateOfBirth(req.getDateOfBirth())
                .status(req.getStatus())
                .build();
    }

    public static StudentResponse toResponse(Student s) {
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
