package com.matrimonial.service;

import com.matrimonial.entity.User;
import com.matrimonial.exception.DuplicateEmailException;
import com.matrimonial.exception.UserNotFoundException;
import com.matrimonial.repository.InterestRepository;
import com.matrimonial.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final InterestRepository interestRepository;

    public UserService(UserRepository userRepository, InterestRepository interestRepository) {
        this.userRepository = userRepository;
        this.interestRepository = interestRepository;
    }

    public User createUser(User user) {
        if (user.getName() == null || user.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = getUserById(userId);
        
        if (updatedUser.getName() == null || updatedUser.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (updatedUser.getEmail() == null || updatedUser.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        if (!existingUser.getEmail().equalsIgnoreCase(updatedUser.getEmail()) &&
                userRepository.existsByEmail(updatedUser.getEmail())) {
            throw new DuplicateEmailException("Email already registered: " + updatedUser.getEmail());
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = getUserById(userId);
        interestRepository.deleteBySenderUserIdOrReceiverUserId(userId, userId);
        userRepository.delete(user);
    }
}
