package com.example.Project_JWT.service;

import com.example.Project_JWT.dto.LoginRequest;
import com.example.Project_JWT.dto.OtpVerifyRequest;
import com.example.Project_JWT.dto.RegisterRequest;
import com.example.Project_JWT.dto.VerifyOtpResponse;
import com.example.Project_JWT.entity.OtpType;
import com.example.Project_JWT.entity.Role;
import com.example.Project_JWT.entity.User;
import com.example.Project_JWT.repository.RoleRepository;
import com.example.Project_JWT.repository.UserRepository;
import com.example.Project_JWT.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepo.findByName("USER")
                .orElseGet(() -> roleRepo.save(new Role(null, "USER")));

        String otp = OtpUtil.generateOtp();

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false);
        user.setOtp(otp);
        user.setOtpType(OtpType.REGISTER);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));
        user.setRole(role);

        userRepo.save(user);
        emailService.sendOtp(user.getEmail(), otp);
    }

    public void login(LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String otp = OtpUtil.generateOtp();
        user.setOtp(otp);
        user.setOtpType(OtpType.LOGIN);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));

        userRepo.save(user);
        emailService.sendOtp(user.getEmail(), otp);
    }


    public VerifyOtpResponse verifyOtp(OtpVerifyRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp() == null ||
                !request.getOtp().equals(user.getOtp()) ||
                user.getOtpExpiredAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        OtpType otpType = user.getOtpType();

        // clear OTP
        user.setOtp(null);
        user.setOtpType(null);
        user.setOtpExpiredAt(null);

        if (otpType == OtpType.LOGIN) {
            String token = jwtService.generateToken(user);
            userRepo.save(user);

            return new VerifyOtpResponse(
                    "Login success",
                    token,
                    user.getRole().getName()
            );
        }

        if (otpType == OtpType.REGISTER) {
            user.setEnabled(true);
            userRepo.save(user);

            return new VerifyOtpResponse(
                    "Register success",
                    null,
                    null
            );
        }

        throw new RuntimeException("Invalid OTP type");
    }

}


