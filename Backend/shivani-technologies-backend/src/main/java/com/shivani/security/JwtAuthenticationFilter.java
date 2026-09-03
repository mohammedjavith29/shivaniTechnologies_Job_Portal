package com.shivani.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shivani.repository.CandidateRepository;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // Allow login/register/OTP APIs
        if (path.startsWith("/api/candidates/login")
                || path.startsWith("/api/candidates/register")
                || path.startsWith("/api/candidates/send-otp")
                || path.startsWith("/api/candidates/verify-otp")
                || path.startsWith("/api/auth")) {

            filterChain.doFilter(request, response);
            return;
        }

        String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token =
                    authHeader.substring(7);

            String email =
                    jwtService.extractEmail(token);

            System.out.println(
                    "JWT Email: " + email
            );

            if (email != null
                    && SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                // Check candidate
                boolean candidateExists =
                        candidateRepository
                                .findByEmail(email)
                                .isPresent();

                if (candidateExists) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    java.util.List.of(
                                            new SimpleGrantedAuthority(
                                                    "ROLE_CANDIDATE"
                                            )
                                    )
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );

                    System.out.println(
                            "Candidate authenticated: "
                                    + email
                    );
                }
            }

        } catch (JwtException e) {

            System.out.println(
                    "Invalid JWT: "
                            + e.getMessage()
            );

            SecurityContextHolder
                    .clearContext();

        } catch (Exception e) {

            System.out.println(
                    "Authentication error: "
                            + e.getMessage()
            );

            SecurityContextHolder
                    .clearContext();
        }

        filterChain.doFilter(request, response);
    }
}