package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Skill;
import com.shivani.repository.SkillRepository;
import com.shivani.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id).orElse(null);
    }

    @Override
    public Skill updateSkill(Long id, Skill skill) {

        Skill existing = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        existing.setSkillName(skill.getSkillName());
        existing.setDescription(skill.getDescription());

        return skillRepository.save(existing);
    }

    @Override
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}