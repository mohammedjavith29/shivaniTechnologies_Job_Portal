package com.shivani.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shivani.dto.SmsRequest;
import com.shivani.service.SmsService;

@RestController
@RequestMapping("/api/sms")
@CrossOrigin(origins = "http://localhost:3000")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/single")
    public ResponseEntity<String> sendSingleSms(
            @RequestBody SmsRequest request) {

        if (request.getPhoneNumbers() == null ||
                request.getPhoneNumbers().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Phone number is required");
        }

        if (request.getMessage() == null ||
                request.getMessage().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Message is required");
        }

        smsService.sendSms(
                request.getPhoneNumbers().get(0),
                request.getMessage()
        );

        return ResponseEntity.ok(
                "SMS sent successfully"
        );
    }

    @PostMapping("/bulk")
    public ResponseEntity<String> sendBulkSms(
            @RequestBody SmsRequest request) {

        if (request.getPhoneNumbers() == null ||
                request.getPhoneNumbers().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Phone numbers are required");
        }

        if (request.getMessage() == null ||
                request.getMessage().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Message is required");
        }

        smsService.sendBulkSms(
                request.getPhoneNumbers(),
                request.getMessage()
        );

        return ResponseEntity.ok(
                "Bulk SMS sent successfully"
        );
    }
}