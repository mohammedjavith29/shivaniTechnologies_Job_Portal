package com.shivani.service.auth.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shivani.dto.LoginRequest;
import com.shivani.dto.LoginResponse;
import com.shivani.dto.RegisterRequest;
import com.shivani.entity.Role;
import com.shivani.entity.User;
import com.shivani.repository.RoleRepository;
import com.shivani.repository.UserRepository;
import com.shivani.security.JwtService;
import com.shivani.service.auth.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {

        System.out.println("===================================");
        System.out.println("Login Email Entered : " + request.getEmail());

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        System.out.println("User Found : " + optionalUser.isPresent());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid Email");
        }

        User user = optionalUser.get();
        
        System.out.println("Stored Password = [" + user.getPassword() + "]");
        System.out.println("Length = " + user.getPassword().length());
        System.out.println("Entered Password = " + request.getPassword());
        
        String hash = user.getPassword();

        System.out.println("Starts with $2a$ = " + hash.startsWith("$2a$"));
        System.out.println("Starts with $2b$ = " + hash.startsWith("$2b$"));

        boolean test = passwordEncoder.matches("12345678", hash);
        System.out.println("Direct Test = " + test);

        System.out.println("Database Email : " + user.getEmail());
        System.out.println("Database Username : " + user.getUsername());

        boolean passwordMatched = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        System.out.println("Entered Password = " + request.getPassword());
        System.out.println("Database Hash = " + user.getPassword());

              System.out.println("Password Match = " + passwordMatched);

        if (!passwordMatched) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                token,
                user.getRole().getRoleName(),
                user.getUsername()
        );
    }

    @Override
    public String register(RegisterRequest request) {

        System.out.println("========== REGISTER ==========");
        System.out.println("Username : " + request.getUsername());
        System.out.println("Email    : " + request.getEmail());
        System.out.println("Mobile   : " + request.getMobile());
        System.out.println("Role     : " + request.getRole());

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        Role role = roleRepository.findByRoleName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        System.out.println("Role from Frontend = " + request.getRole());
        System.out.println(roleRepository.findAll());

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setMobile(request.getMobile());
        user.setEnabled(true);
        user.setRole(role);

        userRepository.save(user);

        return "Registration Successful";
    }}