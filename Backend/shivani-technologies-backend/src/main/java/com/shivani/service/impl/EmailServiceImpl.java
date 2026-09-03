package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.shivani.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(
            String to,
            String subject,
            String message) {

        if (to == null || to.trim().isEmpty()) {
            throw new RuntimeException("Recipient email is required");
        }

        if (subject == null || subject.trim().isEmpty()) {
            throw new RuntimeException("Email subject is required");
        }

        if (message == null || message.trim().isEmpty()) {
            throw new RuntimeException("Email message is required");
        }

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }

    @Override
    public void sendBulkEmail(
            List<String> emailAddresses,
            String subject,
            String message) {

        if (emailAddresses == null ||
                emailAddresses.isEmpty()) {

            throw new RuntimeException(
                    "Email addresses are required"
            );
        }

        for (String email : emailAddresses) {

            if (email == null ||
                    email.trim().isEmpty()) {

                continue;
            }

            SimpleMailMessage mail =
                    new SimpleMailMessage();

            mail.setTo(email);
            mail.setSubject(subject);
            mail.setText(message);

            mailSender.send(mail);
        }
    }
}