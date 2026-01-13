package com.example.Project_JWT.service;

import com.example.Project_JWT.dto.LoginRequest;
import com.example.Project_JWT.dto.LoginResponse;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    @Transactional
    public void register(RegisterRequest request) {
        // Validate email format
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email không được để trống");
        }

        if (!EMAIL_PATTERN.matcher(request.getEmail().trim()).matches()) {
            throw new RuntimeException("Email không hợp lệ");
        }

        // Validate password
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Mật khẩu không được để trống");
        }

        if (request.getPassword().length() < 6) {
            throw new RuntimeException("Mật khẩu phải có ít nhất 6 ký tự");
        }

        String email = request.getEmail().trim().toLowerCase();
        Optional<User> existingUserOpt = userRepo.findByEmail(email);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            // Nếu user đã được kích hoạt, không cho đăng ký lại
            if (existingUser.isEnabled()) {
                throw new RuntimeException("Email này đã được đăng ký. Vui lòng đăng nhập.");
            }
            // Nếu user chưa kích hoạt, resend OTP (update OTP mới)
            String otp = OtpUtil.generateOtp();
            existingUser.setOtp(otp);
            existingUser.setOtpType(OtpType.REGISTER);
            existingUser.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));
            existingUser.setPassword(passwordEncoder.encode(request.getPassword())); // Update password
            userRepo.save(existingUser);
            emailService.sendOtp(existingUser.getEmail(), otp);
            return;
        }

        // Tạo user mới
        Role role = roleRepo.findByName("USER")
                .orElseGet(() -> roleRepo.save(new Role(null, "USER")));

        String otp = OtpUtil.generateOtp();

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false);
        user.setOtp(otp);
        user.setOtpType(OtpType.REGISTER);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));
        user.setRole(role);

        userRepo.save(user);
        emailService.sendOtp(user.getEmail(), otp);
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        // Validate email format
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email không được để trống");
        }

        if (!EMAIL_PATTERN.matcher(request.getEmail().trim()).matches()) {
            throw new RuntimeException("Email không hợp lệ");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Mật khẩu không được để trống");
        }

        String email = request.getEmail().trim().toLowerCase();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không đúng"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Tài khoản chưa được kích hoạt. Vui lòng xác thực email trước.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email hoặc mật khẩu không đúng");
        }

        // Kiểm tra nếu user là ADMIN thì đăng nhập trực tiếp không cần OTP
        if (user.getRole() != null && "ADMIN".equals(user.getRole().getName())) {
            // Xóa OTP cũ nếu có
            user.setOtp(null);
            user.setOtpType(null);
            user.setOtpExpiredAt(null);
            userRepo.save(user);

            // Tạo token và trả về luôn
            String token = jwtService.generateToken(user);
            return new LoginResponse(
                    "Đăng nhập thành công",
                    false,
                    token,
                    user.getRole().getName()
            );
        }

        // User thường cần OTP
        // Xóa OTP cũ nếu có (tránh conflict)
        user.setOtp(null);
        user.setOtpType(null);
        user.setOtpExpiredAt(null);

        // Tạo OTP mới cho login
        String otp = OtpUtil.generateOtp();
        user.setOtp(otp);
        user.setOtpType(OtpType.LOGIN);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));

        userRepo.save(user);
        emailService.sendOtp(user.getEmail(), otp);

        return new LoginResponse(
                "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra email để hoàn tất đăng nhập.",
                true,
                null,
                null
        );
    }

    @Transactional
    public VerifyOtpResponse verifyOtp(OtpVerifyRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email không được để trống");
        }

        if (request.getOtp() == null || request.getOtp().trim().isEmpty()) {
            throw new RuntimeException("Mã OTP không được để trống");
        }

        if (request.getOtp().length() != 6) {
            throw new RuntimeException("Mã OTP phải có 6 chữ số");
        }

        String email = request.getEmail().trim().toLowerCase();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        // Kiểm tra OTP có tồn tại không
        if (user.getOtp() == null || user.getOtpType() == null) {
            throw new RuntimeException("Mã OTP không hợp lệ hoặc đã được sử dụng");
        }

        // Kiểm tra OTP có đúng không
        if (!request.getOtp().trim().equals(user.getOtp())) {
            throw new RuntimeException("Mã OTP không đúng");
        }

        // Kiểm tra OTP có hết hạn không
        if (user.getOtpExpiredAt() == null || user.getOtpExpiredAt().isBefore(LocalDateTime.now())) {
            // Xóa OTP đã hết hạn
            user.setOtp(null);
            user.setOtpType(null);
            user.setOtpExpiredAt(null);
            userRepo.save(user);
            throw new RuntimeException("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
        }

        OtpType otpType = user.getOtpType();

        // Xóa OTP sau khi verify (chỉ dùng 1 lần)
        user.setOtp(null);
        user.setOtpType(null);
        user.setOtpExpiredAt(null);

        if (otpType == OtpType.LOGIN) {
            // Đăng nhập thành công, tạo JWT token
            String token = jwtService.generateToken(user);
            userRepo.save(user);

            return new VerifyOtpResponse(
                    "Đăng nhập thành công",
                    token,
                    user.getRole().getName()
            );
        }

        if (otpType == OtpType.REGISTER) {
            // Kích hoạt tài khoản
            user.setEnabled(true);
            userRepo.save(user);

            return new VerifyOtpResponse(
                    "Đăng ký thành công. Tài khoản đã được kích hoạt.",
                    null,
                    null
            );
        }

        throw new RuntimeException("Loại OTP không hợp lệ");
    }

}


