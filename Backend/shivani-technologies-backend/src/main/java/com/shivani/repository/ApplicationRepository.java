package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shivani.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

}