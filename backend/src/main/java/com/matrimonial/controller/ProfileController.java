package com.matrimonial.controller;

import com.matrimonial.entity.Profile;
import com.matrimonial.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Profile> createProfile(@PathVariable Long userId, @RequestBody Profile profile) {
        return new ResponseEntity<>(profileService.createProfile(userId, profile), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return ResponseEntity.ok(profileService.getAllProfiles());
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.getProfileById(profileId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.getProfileByUserId(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Profile>> searchProfiles(@RequestParam(required = false) String gender,
                                                        @RequestParam(required = false) String city,
                                                        @RequestParam(required = false) Integer age) {
        return ResponseEntity.ok(profileService.searchProfiles(gender, city, age));
    }

    @PutMapping("/{profileId}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long profileId, @RequestBody Profile profile) {
        return ResponseEntity.ok(profileService.updateProfile(profileId, profile));
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<Map<String, String>> deleteProfile(@PathVariable Long profileId) {
        profileService.deleteProfile(profileId);
        return ResponseEntity.ok(Map.of("message", "Profile deleted successfully"));
    }
}
