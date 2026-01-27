package com.example.student_management.entity;

import com.example.student_management.enums.Gender;
import com.example.student_management.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String middleName;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String firstName;


    @Column(unique = true, nullable = false)
    private String cccd;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private StudentStatus status;

    private String imageUrl;
}

