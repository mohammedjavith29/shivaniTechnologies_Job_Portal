package com.shivani.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.shivani.dto.MailRequest;
import com.shivani.service.MailService;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendMail(MailRequest request) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            // Sender Email
            message.setFrom("shivanitechnologies@gmail.com");

            // Receiver Email
            message.setTo(request.getTo());

            // Subject
            message.setSubject(request.getSubject());

            // Message Body
            message.setText(request.getMessage());

            // Send Mail
            mailSender.send(message);

            System.out.println("Mail Sent Successfully");

        } catch (Exception e) {

            System.out.println("Mail Sending Failed");
            e.printStackTrace();

            throw new RuntimeException("Unable to send mail : " + e.getMessage());
        }
    }
}