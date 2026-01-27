package com.example.student_management.controller;

import com.example.student_management.dto.request.StudentRequest;
import com.example.student_management.dto.response.StudentResponse;
import com.example.student_management.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService service;

    @GetMapping
    public List<StudentResponse> getAll() {
        return service.findAll();
    }

    @PostMapping(consumes = "multipart/form-data")
    public StudentResponse create(
            @ModelAttribute StudentRequest request,
            @RequestPart(required = false) MultipartFile image
    ) {
        return service.create(request, image);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public StudentResponse update(
            @PathVariable Long id,
            @ModelAttribute StudentRequest request,
            @RequestPart(required = false) MultipartFile image
    ) {
        return service.update(id, request, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

