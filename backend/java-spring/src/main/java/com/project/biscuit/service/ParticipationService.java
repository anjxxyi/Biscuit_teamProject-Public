package com.project.biscuit.service;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Participation;
import com.project.biscuit.repository.EventRepository;
import com.project.biscuit.repository.ParticipationRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ParticipationService {
    private final ParticipationRepository participationRepository;
    private final EventRepository eventRepository;

    // 전체 이벤트 참여자 리스트 (read)
    public List<Participation> findAll() {
        return participationRepository.findAll();
    }

    // 이벤트 별 참여자 리스트 (read)
    public List<Participation> findParticipations(long no) {
        return participationRepository.findByEventNo(no);
    }

    @Transactional
    // 이벤트 참가 취소
    public void cancelParticipation(Long eventNo, Long userNo) {
        // 1. 이벤트 정보 가져오기
        Event event = eventRepository.findById(eventNo).orElseThrow(() -> new EntityNotFoundException("Event not found"));

        event.setCnt(event.getCnt() - 1); // cnt 값 증가

        participationRepository.deleteByEventNoAndUserNo(eventNo, userNo);
    }
}
