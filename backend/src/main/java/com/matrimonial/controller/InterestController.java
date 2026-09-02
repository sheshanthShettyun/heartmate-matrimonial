package com.matrimonial.controller;

import com.matrimonial.entity.Interest;
import com.matrimonial.service.InterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interests")
public class InterestController {

    private final InterestService interestService;

    public InterestController(InterestService interestService) {
        this.interestService = interestService;
    }

    @PostMapping("/send")
    public ResponseEntity<Interest> sendInterest(@RequestBody Map<String, Long> request) {
        Interest interest = interestService.sendInterest(request.get("senderId"), request.get("receiverId"));
        return new ResponseEntity<>(interest, HttpStatus.CREATED);
    }

    @GetMapping("/sent/{senderId}")
    public ResponseEntity<List<Interest>> getSentInterests(@PathVariable Long senderId) {
        return ResponseEntity.ok(interestService.getSentInterests(senderId));
    }

    @GetMapping("/received/{receiverId}")
    public ResponseEntity<List<Interest>> getReceivedInterests(@PathVariable Long receiverId) {
        return ResponseEntity.ok(interestService.getReceivedInterests(receiverId));
    }

    @PutMapping("/{interestId}/accept")
    public ResponseEntity<Interest> acceptInterest(@PathVariable Long interestId) {
        return ResponseEntity.ok(interestService.acceptInterest(interestId));
    }

    @PutMapping("/{interestId}/reject")
    public ResponseEntity<Map<String, String>> rejectInterest(@PathVariable Long interestId) {
        interestService.deleteInterest(interestId);
        return ResponseEntity.ok(Map.of("message", "Interest rejected successfully"));
    }

    @DeleteMapping("/{interestId}")
    public ResponseEntity<Map<String, String>> deleteInterest(@PathVariable Long interestId) {
        interestService.deleteInterest(interestId);
        return ResponseEntity.ok(Map.of("message", "Interest deleted successfully"));
    }
}
