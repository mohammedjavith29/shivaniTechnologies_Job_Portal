package com.shivani.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shivani.dto.EmailRequest;
import com.shivani.service.EmailService;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "http://localhost:3000")
public class MailController {

    @Autowired
    private EmailService emailService;

    // ==========================================
    // SEND SINGLE MAIL
    // ==========================================

    @PostMapping("/single")
    public ResponseEntity<String> sendSingleMail(
            @RequestBody EmailRequest request) {

        try {

            if (request == null) {
                return ResponseEntity.badRequest()
                        .body("Request body is required");
            }

            if (request.getEmailAddresses() == null ||
                    request.getEmailAddresses().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Email address is required");
            }

            if (request.getSubject() == null ||
                    request.getSubject().trim().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Subject is required");
            }

            if (request.getMessage() == null ||
                    request.getMessage().trim().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Message is required");
            }

            String email =
                    request.getEmailAddresses().get(0);

            emailService.sendEmail(
                    email,
                    request.getSubject(),
                    request.getMessage()
            );

            return ResponseEntity.ok(
                    "Mail sent successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Failed to send mail: "
                        + e.getMessage()
                    );
        }
    }

    // ==========================================
    // SEND BULK MAIL
    // ==========================================

    @PostMapping("/bulk")
    public ResponseEntity<String> sendBulkMail(
            @RequestBody EmailRequest request) {

        try {

            if (request == null) {
                return ResponseEntity.badRequest()
                        .body("Request body is required");
            }

            if (request.getEmailAddresses() == null ||
                    request.getEmailAddresses().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Email addresses are required");
            }

            if (request.getSubject() == null ||
                    request.getSubject().trim().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Subject is required");
            }

            if (request.getMessage() == null ||
                    request.getMessage().trim().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Message is required");
            }

            emailService.sendBulkEmail(
                    request.getEmailAddresses(),
                    request.getSubject(),
                    request.getMessage()
            );

            return ResponseEntity.ok(
                    "Bulk mail sent successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Failed to send bulk mail: "
                        + e.getMessage()
                    );
        }
    }
}