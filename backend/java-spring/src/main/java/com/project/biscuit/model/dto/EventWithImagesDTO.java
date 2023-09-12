package com.project.biscuit.model.dto;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.Images;
import lombok.Getter;

@Getter
public class EventWithImagesDTO {
    private Event event;
    private Images images;

    public EventWithImagesDTO(Event event , Images images ) {
        this.event = event;
        this.images = images;
    }
}
