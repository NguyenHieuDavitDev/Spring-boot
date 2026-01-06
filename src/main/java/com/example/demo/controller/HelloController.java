package com.example.demo.controller;

import com.example.demo.model.Student;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping("hello")
    public String hello(){
        return "Hello spring Boot";
    }
    @GetMapping("/greet")
    public String greet(@RequestParam String name){
        return "xin chào " + name;
    }

    @GetMapping("/students/search")
    public String search(@RequestParam String keyword,
                         @RequestParam (defaultValue = "1") int page){
        return "keyword" + keyword + ", page=" + page;
    }

    @GetMapping("/students/{id}")
    public String getStudent(@PathVariable int id){
        return "Sinh viên có mã: " + id;
    }

    @GetMapping("/students")
    public List<Student> getStudents(){
        List<Student> list = new ArrayList<>();
        list.add(new Student(1, "Trương Nam Sơn", 18));
        list.add(new Student(2, "Huỳnh Trần Ngọc Lợi", 19));
        return list;
    }

}
