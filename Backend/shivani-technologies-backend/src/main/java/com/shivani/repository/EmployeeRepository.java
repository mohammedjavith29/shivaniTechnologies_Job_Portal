package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shivani.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{

}