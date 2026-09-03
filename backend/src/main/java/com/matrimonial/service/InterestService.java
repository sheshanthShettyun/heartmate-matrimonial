package com.matrimonial.service;

import com.matrimonial.entity.Interest;
import com.matrimonial.entity.User;
import com.matrimonial.exception.InterestNotFoundException;
import com.matrimonial.repository.InterestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestService {

    private static final String PENDING = "PENDING";
    private static final String ACCEPTED = "ACCEPTED";
    private static final String REJECTED = "REJECTED";

    private final InterestRepository interestRepository;
    private final UserService userService;

    public InterestService(InterestRepository interestRepository, UserService userService) {
        this.interestRepository = interestRepository;
        this.userService = userService;
    }

    public Interest sendInterest(Long senderId, Long receiverId) {
        if (senderId.equals(receiverId)) {
            throw new IllegalArgumentException("A user cannot send interest to themselves");
        }
        if (interestRepository.existsBySenderUserIdAndReceiverUserIdAndStatus(senderId, receiverId, PENDING)) {
            throw new IllegalStateException("An interest request is already pending for this user");
        }
        User sender = userService.getUserById(senderId);
        User receiver = userService.getUserById(receiverId);

        Interest interest = new Interest();
        interest.setSender(sender);
        interest.setReceiver(receiver);
        interest.setStatus(PENDING);
        return interestRepository.save(interest);
    }

    public List<Interest> getSentInterests(Long senderId) {
        return interestRepository.findBySenderUserId(senderId);
    }

    public List<Interest> getReceivedInterests(Long receiverId) {
        return interestRepository.findByReceiverUserId(receiverId);
    }

    public Interest acceptInterest(Long interestId) {
        return updateStatus(interestId, ACCEPTED);
    }

    public Interest rejectInterest(Long interestId) {
        return updateStatus(interestId, REJECTED);
    }

    public void deleteInterest(Long interestId) {
        Interest interest = getInterestById(interestId);
        interestRepository.delete(interest);
    }

    private Interest updateStatus(Long interestId, String status) {
        Interest interest = getInterestById(interestId);
        interest.setStatus(status);
        return interestRepository.save(interest);
    }

    private Interest getInterestById(Long interestId) {
        return interestRepository.findById(interestId)
                .orElseThrow(() -> new InterestNotFoundException("Interest not found with ID: " + interestId));
    }
}
