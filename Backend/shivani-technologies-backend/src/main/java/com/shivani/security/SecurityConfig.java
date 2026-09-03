package com.shivani.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors ->
                cors.configurationSource(
                    corsConfigurationSource()
                )
            )

            .authorizeHttpRequests(auth -> auth

                // Candidate authentication APIs
                .requestMatchers(
                    "/api/candidates/login",
                    "/api/candidates/register",
                    "/api/candidates/send-otp",
                    "/api/candidates/verify-otp"
                ).permitAll()

                // Admin authentication
                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // Candidate profile requires JWT
                .requestMatchers(
                    "/api/candidates/profile"
                ).authenticated()

                // Other APIs
                .anyRequest().permitAll()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                Arrays.asList(
                    "http://localhost:3000"
                )
        );

        configuration.setAllowedMethods(
                Arrays.asList(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                Arrays.asList("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}