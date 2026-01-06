package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @GetMapping("/")
    public String Home(){
        return "Trang chủ";
    }

    @GetMapping("/demo")
    public String demo(){
        return "Trang demo";
    }

}
