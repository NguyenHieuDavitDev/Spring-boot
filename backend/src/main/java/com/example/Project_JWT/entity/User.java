package com.example.Project_JWT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private  String password;

    private boolean enabled;

    private String otp;

    private LocalDateTime otpExpiredAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


}
