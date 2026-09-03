package com.shivani.service;

import java.util.List;

import com.shivani.entity.Profile;

public interface ProfileService {

    Profile saveProfile(Profile profile);

    List<Profile> getAllProfiles();

    Profile getProfileById(Long id);

    Profile updateProfile(Long id, Profile profile);

    void deleteProfile(Long id);

}