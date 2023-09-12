package com.project.biscuit.controller;


import com.project.biscuit.model.Event;
import com.project.biscuit.model.dto.AddEventRequest;
import com.project.biscuit.model.dto.EventWithImagesDTO;
import com.project.biscuit.model.dto.ParticipationResponse;
import com.project.biscuit.model.dto.UpdateEventRequest;
import com.project.biscuit.service.EventService;
import com.project.biscuit.service.ParticipationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EventController {
    private final EventService eventService;
    private final ParticipationService participationService;

    // 이벤트 저장 (create)
    @PostMapping("/api/events")
    public ResponseEntity<Event> addComment(@RequestBody AddEventRequest request) {
        Event savedEvent = eventService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedEvent);
    }

//    // 이벤트 여러개 가져오기 (read)
//    @GetMapping("/api/events")
//    public ResponseEntity<List<EventResponse>> findallComment() {
//        List<EventResponse> events = eventService.findAll()
//                .stream()
//                .map(EventResponse::new)
//                .toList();
//
//        return ResponseEntity.ok()
//                .body(events);
//    }

    // images 에 event_no 를 join 해서 이벤트 리스트 출력 (read)
    @GetMapping("/api/events")
    public ResponseEntity<List<EventWithImagesDTO>> getAllEventsWithImages() {
        List<EventWithImagesDTO> events = eventService.getAllEventsWithImages()
                .stream()
                .map(result -> new EventWithImagesDTO(result.getEvent(), result.getImages()))
                .toList();

        return ResponseEntity.ok()
                .body(events);
    }

    // image 가 들어간 이벤트 게시글
    @GetMapping("/api/events/{no}")
    public List<EventWithImagesDTO> findByIdEventsWithImages(@PathVariable Long no) {
        return eventService.findByIdEventsWithImages(no);
    }
    
    // 이벤트 수정하기 (update)
    @PutMapping("/api/events/{no}")
    public ResponseEntity<Event> updateComment(@PathVariable long no, @RequestBody UpdateEventRequest request) {
        Event updatedEvent = eventService.update(no, request);

        return ResponseEntity.ok()
                .body(updatedEvent);
    }

    // ----------------------------------------------------------------------------------------------
    // participation 관련 메소드

    // 전체 이벤트 참여자 리스트 (read)
    @GetMapping("/api/participations")
    public ResponseEntity<List<ParticipationResponse>> findallParticipation() {
        List<ParticipationResponse> participations = participationService.findAll()
                .stream()
                .map(ParticipationResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(participations);
    }

    // 이벤트 별 참여자 리스트 (read)
    @GetMapping("/api/participations/events/{no}")
    public ResponseEntity<List<ParticipationResponse>> findbyEventNoParticipation(@PathVariable long no) {
        List<ParticipationResponse> participations = participationService.findParticipations(no)
                .stream()
                .map(ParticipationResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(participations);
    }

    // 이벤트 참가하기
    @PostMapping("/api/events/{eventId}/participate/{userId}")
    public ResponseEntity<String> participateInEvent(@PathVariable Long eventId, @PathVariable Long userId) {
        eventService.participateInEvent(eventId, userId);
        return ResponseEntity.ok("이벤트 참여되었습니다.");
    }

    // 이벤트 참여 취소
    @DeleteMapping("/api/events/{eventId}/participate/{userId}")
    public ResponseEntity<String> cancelParticipationInEvent(@PathVariable Long eventId, @PathVariable Long userId) {
        participationService.cancelParticipation(eventId, userId);
        return ResponseEntity.ok("이벤트 참여가 취소되었습니다.");
    }
}
