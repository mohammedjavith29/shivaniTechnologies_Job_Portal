package com.shivani.service.auth;

import com.shivani.dto.LoginRequest;
import com.shivani.dto.LoginResponse;
import com.shivani.dto.RegisterRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    String register(RegisterRequest request);

}