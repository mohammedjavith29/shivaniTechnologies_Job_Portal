package com.shivani.service;

import java.util.List;

import com.shivani.entity.Role;

public interface RoleService {

    Role saveRole(Role role);

    List<Role> getAllRoles();

    Role getRoleById(Long id);

    void deleteRole(Long id);

}