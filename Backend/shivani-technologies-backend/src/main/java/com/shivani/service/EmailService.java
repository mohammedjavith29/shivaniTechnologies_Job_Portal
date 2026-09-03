package com.shivani.service;

import java.util.List;

public interface EmailService {

    void sendEmail(
            String to,
            String subject,
            String message
    );

    void sendBulkEmail(
            List<String> emailAddresses,
            String subject,
            String message
    );
}