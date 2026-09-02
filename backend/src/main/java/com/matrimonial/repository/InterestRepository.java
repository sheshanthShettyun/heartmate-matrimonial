package com.matrimonial.repository;

import com.matrimonial.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    List<Interest> findBySenderUserId(Long senderId);
    List<Interest> findByReceiverUserId(Long receiverId);
}
