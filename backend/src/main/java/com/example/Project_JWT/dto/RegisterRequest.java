package com.example.Project_JWT.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}
