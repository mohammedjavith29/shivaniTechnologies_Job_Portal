package com.shivani.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.shivani.entity.Role;
import com.shivani.repository.RoleRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        createRoleIfNotExists("ADMIN");
        createRoleIfNotExists("EMPLOYEE");
        createRoleIfNotExists("CANDIDATE");
        createRoleIfNotExists("EMPLOYER");
    }

    private void createRoleIfNotExists(String roleName) {
        if (roleRepository.findByRoleName(roleName).isEmpty()) {
            Role role = new Role();
            role.setRoleName(roleName);
            roleRepository.save(role);
        }
    }
}