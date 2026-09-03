package com.shivani;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.shivani")
public class ShivaniTechnologiesBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShivaniTechnologiesBackendApplication.class, args);
    }
}