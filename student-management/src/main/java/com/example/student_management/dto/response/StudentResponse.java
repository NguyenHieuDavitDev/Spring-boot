package com.example.student_management.dto.response;

import com.example.student_management.enums.Gender;
import com.example.student_management.enums.StudentStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class StudentResponse {

    private Long id;
    private String fullName;
    private String cccd;
    private Gender gender;
    private LocalDate dateOfBirth;
    private StudentStatus status;
    private String imageUrl;
}