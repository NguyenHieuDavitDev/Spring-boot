package com.example.Project_JWT.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
