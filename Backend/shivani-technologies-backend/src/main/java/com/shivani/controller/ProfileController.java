package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Profile;
import com.shivani.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private ProfileService service;

    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        return service.saveProfile(profile);
    }

    @GetMapping
    public List<Profile> getAllProfiles() {
        return service.getAllProfiles();
    }

    @GetMapping("/{id}")
    public Profile getProfile(@PathVariable Long id) {
        return service.getProfileById(id);
    }

    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable Long id,
                                 @RequestBody Profile profile) {
        return service.updateProfile(id, profile);
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {

        service.deleteProfile(id);

        return "Profile Deleted Successfully";
    }
}