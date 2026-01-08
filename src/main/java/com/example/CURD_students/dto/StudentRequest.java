package com.example.CURD_students.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class StudentRequest {

    private String name;
    private int age;
    private String email;

    private MultipartFile avatar;
}
