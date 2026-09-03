package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Employee;
import com.shivani.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public Employee save(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }

    @GetMapping
    public List<Employee> getAll(){
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id,
                           @RequestBody Employee employee){
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return "Employee Deleted Successfully";
    }

}