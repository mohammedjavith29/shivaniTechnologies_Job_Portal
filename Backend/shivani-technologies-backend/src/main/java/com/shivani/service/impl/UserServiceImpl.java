package com.shivani.service.impl;

import java.util.List;
import com.shivani.service.UserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shivani.entity.Role;
import com.shivani.entity.User;
import com.shivani.repository.RoleRepository;
import com.shivani.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User saveUser(User user) {

        if (user == null) {
            throw new RuntimeException("User data is required");
        }

        if (user.getUsername() == null ||
            user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }

        if (user.getEmail() == null ||
            user.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (user.getPassword() == null ||
            user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (user.getMobile() == null ||
            user.getMobile().trim().isEmpty()) {
            throw new RuntimeException("Mobile is required");
        }

        if (user.getRole() == null ||
            user.getRole().getRoleId() == null) {
            throw new RuntimeException("Role is required");
        }

        user.setUsername(user.getUsername().trim());
        user.setEmail(user.getEmail().trim().toLowerCase());
        user.setMobile(user.getMobile().trim());

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException(
                "Email already exists: " + user.getEmail()
            );
        }

        // Get existing Role from database
        Long roleId = user.getRole().getRoleId();

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Role not found with ID: " + roleId
                    )
                );

        user.setRole(role);

        if (user.getEnabled() == null) {
            user.setEnabled(true);
        }

        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {

        if (id == null) {
            throw new RuntimeException("User ID is required");
        }

        return userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "User not found with ID: " + id
                    )
                );
    }

    @Override
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "User not found with ID: " + id
                    )
                );

        if (updatedUser.getUsername() != null &&
            !updatedUser.getUsername().trim().isEmpty()) {

            existingUser.setUsername(
                updatedUser.getUsername().trim()
            );
        }

        if (updatedUser.getEmail() != null &&
            !updatedUser.getEmail().trim().isEmpty()) {

            String email =
                updatedUser.getEmail().trim().toLowerCase();

            if (!email.equals(existingUser.getEmail()) &&
                userRepository.existsByEmail(email)) {

                throw new RuntimeException(
                    "Email already exists: " + email
                );
            }

            existingUser.setEmail(email);
        }

        if (updatedUser.getPassword() != null &&
            !updatedUser.getPassword().trim().isEmpty()) {

            existingUser.setPassword(updatedUser.getPassword());
        }

        if (updatedUser.getMobile() != null &&
            !updatedUser.getMobile().trim().isEmpty()) {

            existingUser.setMobile(
                updatedUser.getMobile().trim()
            );
        }

        if (updatedUser.getEnabled() != null) {
            existingUser.setEnabled(updatedUser.getEnabled());
        }

        // Update role
        if (updatedUser.getRole() != null &&
            updatedUser.getRole().getRoleId() != null) {

            Long roleId = updatedUser.getRole().getRoleId();

            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() ->
                        new RuntimeException(
                            "Role not found with ID: " + roleId
                        )
                    );

            existingUser.setRole(role);
        }

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException(
                "User not found with ID: " + id
            );
        }

        userRepository.deleteById(id);
    }
}