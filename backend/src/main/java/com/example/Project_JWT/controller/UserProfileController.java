package com.example.Project_JWT.controller;

import com.example.Project_JWT.dto.UserResponse;
import com.example.Project_JWT.repository.UserRepository;
import com.example.Project_JWT.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(HttpServletRequest request) {
        String token = extractToken(request);
        String email = jwtService.extractEmail(token);
        
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(new UserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.isEnabled(),
                        user.getRole() != null ? user.getRole().getName() : null,
                        user.getRole() != null ? user.getRole().getId() : null
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Token không hợp lệ");
    }
}
