package com.example.Project_JWT.service;

import com.example.Project_JWT.dto.RoleRequest;
import com.example.Project_JWT.dto.RoleResponse;
import com.example.Project_JWT.entity.Role;
import com.example.Project_JWT.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(role -> new RoleResponse(role.getId(), role.getName()))
                .collect(Collectors.toList());
    }

    public RoleResponse getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));
        return new RoleResponse(role.getId(), role.getName());
    }

    @Transactional
    public RoleResponse createRole(RoleRequest request) {
        if (roleRepository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("Role đã tồn tại");
        }
        Role role = new Role();
        role.setName(request.getName());
        role = roleRepository.save(role);
        return new RoleResponse(role.getId(), role.getName());
    }

    @Transactional
    public RoleResponse updateRole(Long id, RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));
        
        if (!role.getName().equals(request.getName()) && 
            roleRepository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("Role đã tồn tại");
        }
        
        role.setName(request.getName());
        role = roleRepository.save(role);
        return new RoleResponse(role.getId(), role.getName());
    }

    @Transactional
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));
        
        // Không cho phép xóa ADMIN và USER role
        if ("ADMIN".equals(role.getName()) || "USER".equals(role.getName())) {
            throw new RuntimeException("Không thể xóa role hệ thống");
        }
        
        roleRepository.delete(role);
    }
}
