package com.matrimonial.service;

import com.matrimonial.entity.Profile;
import com.matrimonial.entity.User;
import com.matrimonial.exception.ProfileNotFoundException;
import com.matrimonial.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserService userService;

    public ProfileService(ProfileRepository profileRepository, UserService userService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
    }

    public Profile createProfile(Long userId, Profile profile) {
        User user = userService.getUserById(userId);
        if (profileRepository.findByUserUserId(userId).isPresent()) {
            throw new IllegalArgumentException("This user already has a profile");
        }
        validateProfile(profile);
        profile.setUser(user);
        return profileRepository.save(profile);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfileById(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found with ID: " + profileId));
    }

    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for user ID: " + userId));
    }

    public List<Profile> searchProfiles(String gender, String city, Integer age) {
        return profileRepository.searchProfiles(emptyToNull(gender), emptyToNull(city), age);
    }

    public Profile updateProfile(Long profileId, Profile updatedProfile) {
        Profile existingProfile = getProfileById(profileId);
        validateProfile(updatedProfile);
        existingProfile.setAge(updatedProfile.getAge());
        existingProfile.setGender(updatedProfile.getGender());
        existingProfile.setCity(updatedProfile.getCity());
        existingProfile.setEducation(updatedProfile.getEducation());
        existingProfile.setOccupation(updatedProfile.getOccupation());
        existingProfile.setAbout(updatedProfile.getAbout());
        return profileRepository.save(existingProfile);
    }

    public void deleteProfile(Long profileId) {
        Profile profile = getProfileById(profileId);
        profileRepository.delete(profile);
    }

    private void validateProfile(Profile profile) {
        if (profile.getAge() == null || profile.getAge() < 18) {
            throw new IllegalArgumentException("Age must be 18 or above");
        }
        if (profile.getGender() == null || profile.getGender().isBlank()) {
            throw new IllegalArgumentException("Gender is required");
        }
        if (profile.getCity() == null || profile.getCity().isBlank()) {
            throw new IllegalArgumentException("City is required");
        }
    }

    private String emptyToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}
