package com.shivani.service;

import java.util.List;
import com.shivani.entity.Skill;

public interface SkillService {

    Skill saveSkill(Skill skill);

    List<Skill> getAllSkills();

    Skill getSkillById(Long id);

    Skill updateSkill(Long id, Skill skill);

    void deleteSkill(Long id);

}