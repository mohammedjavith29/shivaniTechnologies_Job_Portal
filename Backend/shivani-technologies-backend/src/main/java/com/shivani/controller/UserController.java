package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.User;
import com.shivani.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // ==========================================
    // CREATE USER
    // ==========================================

    @PostMapping
    public ResponseEntity<?> saveUser(
            @RequestBody User user) {

        try {

            User savedUser =
                userService.saveUser(user);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        java.util.Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }

    // ==========================================
    // GET ALL USERS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
            userService.getAllUsers()
        );
    }

    // ==========================================
    // GET USER BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                userService.getUserById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                        java.util.Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }

    // ==========================================
    // UPDATE USER
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        try {

            User updatedUser =
                userService.updateUser(id, user);

            return ResponseEntity.ok(updatedUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        java.util.Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }

    // ==========================================
    // DELETE USER
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        try {

            userService.deleteUser(id);

            return ResponseEntity.ok(
                java.util.Map.of(
                    "message",
                    "User deleted successfully"
                )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                        java.util.Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }
}