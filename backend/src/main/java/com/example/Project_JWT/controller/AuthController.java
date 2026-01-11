package com.example.Project_JWT.controller;

import com.example.Project_JWT.dto.*;
import com.example.Project_JWT.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return new LoginResponse("OTP sent to email", true);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        authService.login(request);
        return new LoginResponse("OTP sent to email", true);
    }

    @PostMapping("/verify-otp")
    public VerifyOtpResponse verify(@RequestBody OtpVerifyRequest request) {
        return authService.verifyOtp(request);
    }
}
