package com.shivani.dto;

import java.util.List;

public class SmsRequest {

    private List<String> phoneNumbers;
    private String message;

    public SmsRequest() {
    }

    public List<String> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(List<String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}