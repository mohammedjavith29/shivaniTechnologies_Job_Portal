package com.shivani.service;

import java.util.List;

public interface SmsService {

    void sendSms(String phoneNumber, String message);

    void sendBulkSms(List<String> phoneNumbers, String message);
}