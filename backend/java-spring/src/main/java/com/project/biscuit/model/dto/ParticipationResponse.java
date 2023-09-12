package com.project.biscuit.model.dto;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Participation;
import com.project.biscuit.model.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ParticipationResponse {
    private Long no;

    private User user_no;
    private Event event_no;
    private LocalDateTime created_at;

    public ParticipationResponse (Participation participation) {
        this.no = participation.getNo();

        this.user_no = participation.getUser();
        this.event_no = participation.getEvent();
        this.created_at = participation.getCreatedAt();
    }
}
