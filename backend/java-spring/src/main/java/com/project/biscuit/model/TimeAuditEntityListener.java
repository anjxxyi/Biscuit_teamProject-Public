package com.project.biscuit.model;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDateTime;

public class TimeAuditEntityListener {
    @PrePersist
    public void prevInsert(Object o) {
        if( o instanceof TimeAuditable){
            ((TimeAuditable) o).setCreatedAt(LocalDateTime.now());
        }
    }

    @PreUpdate
    public void prevUpdate(Object o) {
        if( o instanceof TimeAuditable){
            ((TimeAuditable) o).setUpdatedAt(LocalDateTime.now());
        }
    }
}