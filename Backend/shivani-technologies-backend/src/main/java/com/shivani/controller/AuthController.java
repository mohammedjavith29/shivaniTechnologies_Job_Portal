package com.shivani.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shivani.dto.LoginRequest;
import com.shivani.dto.LoginResponse;
import com.shivani.dto.RegisterRequest;
import com.shivani.service.auth.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        try {

            String message = authService.register(request);

            return ResponseEntity.ok(message);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("=================================");
        System.out.println("Controller Login API Called");
        System.out.println("Email = " + request.getEmail());
        System.out.println("Password = " + request.getPassword());

        try {

            LoginResponse response = authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
    
}