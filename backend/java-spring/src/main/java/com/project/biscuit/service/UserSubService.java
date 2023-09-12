package com.project.biscuit.service;

import com.project.biscuit.model.UserSub;
import com.project.biscuit.repository.UserSubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserSubService {
    private final UserSubRepository userSubRepository;

    // 구독자들 리스트 (read)
    public List<UserSub> getUserSubscriptions(Long userNo) {
        return userSubRepository.findByUserNo(userNo);
    }

    // 구독을 당한사람 리스트 (read)
    public List<UserSub> getSubscribers(Long subedUserNo) {
        return userSubRepository.findBySubedUserNo(subedUserNo);
    }

    // 구독 취소
    public boolean cancelSubscription(Long userNo, Long subedUserNo) {
        UserSub userSub = userSubRepository.findByUserNoAndSubedUserNo(userNo, subedUserNo);
        if (userSub != null) {
            userSubRepository.delete(userSub);
            return true;
        } else {
            return false;
        }
    }

    // 구독 여부 확인
    public boolean isSubscribed(Long userNo, Long subedUserNo) {
        return userSubRepository.existsByUserNoAndSubedUserNo(userNo, subedUserNo);
    }

    // 구독하기
    public void saveUserSub(UserSub userSub) {
        userSubRepository.save(userSub);
    }

}
