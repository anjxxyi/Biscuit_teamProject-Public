package com.project.biscuit.model.dto;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Images;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class EventResponse {
    private Long no;

    private String title;
    private String content;
    private Long cnt;
    private Long likes;
    private String del_yn;

    private LocalDateTime event_start;
    private LocalDateTime event_end;
    private String event_type;

    private Images images_no;
    private LocalDateTime created_at;

    public EventResponse (Event event) {
        this.no = event.getNo();

        this.title = event.getTitle();
        this.content = event.getContent();
        this.cnt = event.getCnt();
        this.likes = event.getLikes();
        this.del_yn = event.getDel_yn();

        this.event_start = event.getEvent_start();
        this.event_end = event.getEvent_end();
        this.event_type = event.getEventType();

        this.images_no = event.getImages();
        this.created_at = event.getCreatedAt();
    }
}
