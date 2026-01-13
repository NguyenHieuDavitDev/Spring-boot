package com.example.Project_JWT.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoleRequest {
    @NotBlank(message = "Tên role không được để trống")
    private String name;
}
