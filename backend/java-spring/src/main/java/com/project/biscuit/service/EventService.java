package com.project.biscuit.service;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Participation;
import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.AddEventRequest;
import com.project.biscuit.model.dto.EventWithImagesDTO;
import com.project.biscuit.model.dto.UpdateEventRequest;
import com.project.biscuit.repository.EventRepository;
import com.project.biscuit.repository.ParticipationRepository;
import com.project.biscuit.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ParticipationRepository participationRepository;

    // 이벤트 작성 (create)
    public Event save(AddEventRequest request) {
        return eventRepository.save(request.toEntity());
    }

    // 이벤트 전체 가져오기 (read)
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    // 이벤트 하나 가져오기 (read)
    public Event findById(long no) {
        return eventRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));
    }

    // 이벤트 수정하기 (update)
    @Transactional
    public Event update(long no, UpdateEventRequest request) {
        Event event = eventRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));

        event.update(
                request.getTitle(),
                request.getContent(),
                request.getDel_yn(),
                request.getCnt(),
                request.getLikes(),
                request.getImages_no(),
                request.getEvent_type(),
                request.getEvent_start(),
                request.getEvent_end()
        );

        return event;
    }

    // images 에 event_no 를 join 해서 이벤트 리스트 출력 (read)
    public List<EventWithImagesDTO> getAllEventsWithImages() {
        return eventRepository.findAllEventsWithImages();
    }

    // image 를 가진 이벤트 게시글
    public List<EventWithImagesDTO> findByIdEventsWithImages(Long no) {
        return eventRepository.findByIdEventsWithImages(no);
    }

    // 이벤트 참여하기
    public void participateInEvent(Long eventId, Long userId) {
        // 1. 이벤트 정보 가져오기
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EntityNotFoundException("Event not found"));

        // 2. 사용자 정보 가져오기
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        // 3. 참가 정보 생성 및 저장
        Participation participation = Participation.builder()
                .event(event)
                .user(user)
                .build();

        participationRepository.save(participation);

        // 4. 이벤트의 cnt 값 증가
        event.setCnt(event.getCnt() + 1); // cnt 값 증가
        eventRepository.save(event); // 변경된 event 정보 저장
    }
}
