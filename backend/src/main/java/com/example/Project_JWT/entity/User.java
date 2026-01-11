package com.example.Project_JWT.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private boolean enabled;

    private String otp;

    @Enumerated(EnumType.STRING)
    private OtpType otpType; // BẮT BUỘC

    private LocalDateTime otpExpiredAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}

