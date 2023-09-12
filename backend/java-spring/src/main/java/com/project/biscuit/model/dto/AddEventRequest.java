package com.project.biscuit.model.dto;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Images;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AddEventRequest {
    private Long no;
    private String title;
    private String content;
    private Long cnt;
    private Long likes;
    private String del_yn;
    private String event_type;
    private LocalDateTime event_start;
    private LocalDateTime event_end;

    private Images images_no;

    public Event toEntity() {
        return Event.builder()
                .no(no)
                .title(title)
                .content(content)
                .cnt(cnt)
                .likes(likes)
                .del_yn(del_yn)
                .images(images_no)
                .eventType(event_type)
                .event_start(event_start)
                .event_end(event_end)
                .build();
    }
}
