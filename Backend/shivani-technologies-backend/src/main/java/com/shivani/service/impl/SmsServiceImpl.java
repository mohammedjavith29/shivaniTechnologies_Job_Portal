package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.shivani.service.SmsService;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import jakarta.annotation.PostConstruct;

@Service
public class SmsServiceImpl implements SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initializeTwilio() {

        Twilio.init(accountSid, authToken);
    }

    @Override
    public void sendSms(String phoneNumber, String message) {

        Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(twilioPhoneNumber),
                message
        ).create();
    }

    @Override
    public void sendBulkSms(
            List<String> phoneNumbers,
            String message) {

        for (String phoneNumber : phoneNumbers) {

            if (phoneNumber != null &&
                    !phoneNumber.trim().isEmpty()) {

                sendSms(phoneNumber, message);
            }
        }
    }
}