package com.example.Project_JWT.config;

import com.example.Project_JWT.entity.Role;
import com.example.Project_JWT.entity.User;
import com.example.Project_JWT.repository.RoleRepository;
import com.example.Project_JWT.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Tạo ADMIN role nếu chưa có
        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ADMIN");
                    return roleRepository.save(role);
                });

        // Tạo USER role nếu chưa có
        roleRepository.findByName("USER")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("USER");
                    return roleRepository.save(role);
                });

        // Tạo hoặc cập nhật admin mặc định với mật khẩu 123456
        userRepository.findByEmail("admin@admin.com").ifPresentOrElse(
            existingAdmin -> {
                // Cập nhật mật khẩu và role nếu cần
                existingAdmin.setPassword(passwordEncoder.encode("123456"));
                existingAdmin.setEnabled(true);
                existingAdmin.setRole(adminRole);
                userRepository.save(existingAdmin);
            },
            () -> {
                User admin = new User();
                admin.setEmail("admin@admin.com");
                admin.setPassword(passwordEncoder.encode("123456"));
                admin.setEnabled(true);
                admin.setRole(adminRole);
                userRepository.save(admin);
            }
        );
    }
}
