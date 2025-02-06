package com.linked.service;

import com.linked.dto.ProfileDTO;
import com.linked.entity.Profile;
import com.linked.exception.JobPortalException;
import com.linked.repository.ProfileRepository;
import com.linked.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setSavedJobs(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        return profileRepository.findById(id).orElseThrow(() -> new JobPortalException("Profile not found")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        Profile existingProfile = profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new JobPortalException("Profile not found"));

        // Update existing profile instead of creating a new one
        existingProfile.setEmail(profileDTO.getEmail());
        existingProfile.setSkills(profileDTO.getSkills());
        existingProfile.setExperiences(profileDTO.getExperiences());
        existingProfile.setCertifications(profileDTO.getCertifications());
        existingProfile.setSavedJobs(profileDTO.getSavedJobs());

        profileRepository.save(existingProfile); // Save updated profile
        return existingProfile.toDTO(); // Convert back to DTO and return
    }


    @Override
    public List<ProfileDTO> getAllProfiles() {
        return profileRepository.findAll().stream().map((x) -> x.toDTO()).toList();
    }
}
