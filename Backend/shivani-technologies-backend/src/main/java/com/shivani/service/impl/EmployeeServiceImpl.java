package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Employee;
import com.shivani.repository.EmployeeRepository;
import com.shivani.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {

        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));

        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setEmail(employee.getEmail());
        emp.setMobile(employee.getMobile());
        emp.setDepartment(employee.getDepartment());
        emp.setDesignation(employee.getDesignation());
        emp.setSalary(employee.getSalary());
        emp.setRole(employee.getRole());
        emp.setUsername(employee.getUsername());
        emp.setPassword(employee.getPassword());
        emp.setActive(employee.getActive());

        return employeeRepository.save(emp);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

}