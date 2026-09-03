package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shivani.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}