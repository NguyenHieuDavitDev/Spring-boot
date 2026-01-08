package com.example.CURD_students.controller;

import com.example.CURD_students.dto.StudentRequest;
import com.example.CURD_students.model.Student;
import com.example.CURD_students.service.StudentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student create(@ModelAttribute StudentRequest request) throws IOException {
        return service.create(request);
    }

    @PutMapping( value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student update(@PathVariable Long id, @ModelAttribute StudentRequest request) throws IOException{
            return service.update(id, request);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.softDeleted(id);
        return "Deleted (soft)";
    }
}
