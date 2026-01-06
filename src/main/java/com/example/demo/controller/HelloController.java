package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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


}
