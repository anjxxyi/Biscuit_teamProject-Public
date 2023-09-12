package com.project.biscuit.repository;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.dto.EventWithImagesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // images 에 event_no 를 join 해서 이벤트 리스트 출력 (read)
    @Query("SELECT distinct new com.project.biscuit.model.dto.EventWithImagesDTO(e, i) FROM Event e JOIN Images i ON i.event = e WHERE i.thumbnailYn = 'Y' AND e.del_yn='N' ORDER BY e.createdAt DESC")
    List<EventWithImagesDTO> findAllEventsWithImages();
    // images 에 event_no 를 join 해서 이벤트 리스트 출력 (read)
    @Query("SELECT distinct new com.project.biscuit.model.dto.EventWithImagesDTO(e, i) FROM Event e JOIN Images i ON i.event = e WHERE e.no = :no ORDER BY e.createdAt DESC")
    List<EventWithImagesDTO> findByIdEventsWithImages(@Param("no") Long no);
}
