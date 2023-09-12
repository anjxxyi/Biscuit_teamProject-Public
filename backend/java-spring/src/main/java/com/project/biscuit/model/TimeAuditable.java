package com.project.biscuit.model;

import java.time.LocalDateTime;

public interface TimeAuditable {
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

    void setCreatedAt(LocalDateTime createAt);
    void setUpdatedAt(LocalDateTime updateAt);
}
