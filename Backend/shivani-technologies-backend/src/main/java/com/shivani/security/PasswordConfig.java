package com.shivani.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

 
    public void printPassword() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Password Hash = " + encoder.encode("12345678"));
    }
}