package com.example.Project_JWT.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyOtpResponse {
    private String message;
    private String token;
    private String role;
}
