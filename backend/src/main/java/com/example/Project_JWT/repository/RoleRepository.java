package com.example.Project_JWT.repository;

import com.example.Project_JWT.entity.Role;
import com.example.Project_JWT.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}


