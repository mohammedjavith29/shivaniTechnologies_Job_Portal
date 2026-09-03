package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Profile;
import com.shivani.repository.ProfileRepository;
import com.shivani.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository repository;

    @Override
    public Profile saveProfile(Profile profile) {
        return repository.save(profile);
    }

    @Override
    public List<Profile> getAllProfiles() {
        return repository.findAll();
    }

    @Override
    public Profile getProfileById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Profile updateProfile(Long id, Profile profile) {

        Profile existing = repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setFullName(profile.getFullName());
            existing.setEmail(profile.getEmail());
            existing.setMobile(profile.getMobile());
            existing.setQualification(profile.getQualification());
            existing.setExperience(profile.getExperience());
            existing.setSkills(profile.getSkills());
            existing.setLocation(profile.getLocation());
            existing.setAboutMe(profile.getAboutMe());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteProfile(Long id) {
        repository.deleteById(id);
    }

}