//package com.shivani.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.shivani.dto.CandidateLoginRequest;
//import com.shivani.dto.CandidateLoginResponse;
//import com.shivani.service.candidateauth.CandidateAuthService;
//
//@RestController
//@RequestMapping("/api/candidate/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class CandidateAuthController {
//
//    @Autowired
//    private CandidateAuthService candidateAuthService;
//
//    @PostMapping("/login")
//    public CandidateLoginResponse login(
//            @RequestBody CandidateLoginRequest request) {
//
//        return candidateAuthService.login(request);
//    }
//}