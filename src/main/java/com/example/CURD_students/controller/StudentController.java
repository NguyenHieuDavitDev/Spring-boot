package com.example.CURD_students.controller;

import com.example.CURD_students.dto.StudentRequest;
import com.example.CURD_students.model.Student;
import com.example.CURD_students.service.StudentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public Student create(
//            @RequestParam String name,
//            @RequestParam int age,
//            @RequestParam String email,
//            @RequestParam(required = false) MultipartFile avatar
//    ) throws IOException {
//
//        Student student = new Student();
//        student.setName(name);
//        student.setAge(age);
//        student.setEmail(email);
//
//        return service.create(student, avatar);
//    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student create(@ModelAttribute StudentRequest request) throws IOException {
        return service.create(request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.softDeleted(id);
        return "Deleted (soft)";
    }
}
