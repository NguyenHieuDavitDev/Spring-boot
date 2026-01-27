package com.example.student_management.dto.request;

import com.example.student_management.enums.Gender;
import com.example.student_management.enums.StudentStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


@Getter
@Setter
public class StudentRequest {

    private String middleName;
    private String firstName;
    private String cccd;

    private Gender gender;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateOfBirth;

    private StudentStatus status;
}