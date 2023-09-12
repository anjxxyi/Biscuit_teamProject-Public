package com.project.biscuit.controller;

import com.project.biscuit.model.Bookclass;
import com.project.biscuit.model.dto.BkclassMemReqDto;
import com.project.biscuit.model.dto.BookclassEditReponseDto;
import com.project.biscuit.model.dto.BookclassReponseDto;
import com.project.biscuit.model.dto.BookclassRequestDto;
import com.project.biscuit.service.BookclassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/bookclass")
@RestController
public class BookclassController {
    private final BookclassService bookclassService;

    @PostMapping("/apply")  // Create : POST -> "/api/bookclass/apply" 클래스 개설 신청
    public ResponseEntity<BookclassReponseDto> applyBookclass(@RequestBody BookclassRequestDto req) {
        return ResponseEntity.ok(bookclassService.apply(req));
    }

    @GetMapping("/list/{userNo}")    // Read : GET -> "/api/bookclass/list/{sort}" 북클래스 목록
    public ResponseEntity<List<BookclassReponseDto>> findAllBookclass(@PathVariable long userNo) {
        return ResponseEntity.ok().body(bookclassService.getBookclassAll(userNo));
    }

    @GetMapping("/classNo={id}&userNo={no}")   // Read : GET -> "/api/bookclass/classNo={id}&userNo={no}" 북클래스 상세, 사용자 참여 여부 포함
    public ResponseEntity<BookclassReponseDto> findBookclass(@PathVariable Long id, @PathVariable Long no) {
        return ResponseEntity.ok().body(bookclassService.getBookclass(id, no));
    }

    @GetMapping("/{id}/e")   // Read : GET -> "/api/bookclass/{no}/e" 북클래스 수정용 상세 정보 가져오기
    public ResponseEntity<BookclassEditReponseDto> findBookclassForEdit(@PathVariable Long id) {
        Bookclass bookclass = bookclassService.getBookclassForEdit(id);
        return ResponseEntity.ok().body(BookclassEditReponseDto.of(bookclass));
    }

    @PutMapping("/{id}/update")  // Update : PUT -> "/api/bookclass/{no}/update" 북클래스 수정
    public ResponseEntity<Bookclass> updateBookclass(@PathVariable Long id, @RequestBody BookclassRequestDto req) {
        Bookclass updatedBookclass = bookclassService.update(id, req);
        return ResponseEntity.ok().body(updatedBookclass);
    }

    @GetMapping("/search/q={keyword}&u={userNo}")
    public ResponseEntity<List<BookclassReponseDto>> searchBookclass(@PathVariable String keyword,@PathVariable Long userNo) {
        return ResponseEntity.ok().body(bookclassService.searchClass(keyword, userNo));
    }


    // 사용자 action -------------------
    // 참여하기
    @PostMapping("/party/in")
    public ResponseEntity<String> inClass(@RequestBody BkclassMemReqDto req) { // String이 json으로 안넘어가고 그냥 문자열로 넘어감
        return ResponseEntity.ok().body(bookclassService.inClass(req));
    }

    // 참여 취소하기
    @PostMapping("/party/out")
    public String outClass(@RequestBody BkclassMemReqDto req) {
        return bookclassService.outClass(req);
    }


    // 관리지 기능 -----------------
    @GetMapping("/delete/{no}") // delete bookclass
    public ResponseEntity<String> deleteBookclass(@PathVariable long no) {
        bookclassService.delete(no);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/all/{sortNum}") // get all bookclass or applied bookclass for Admin
    public ResponseEntity<List<BookclassReponseDto>> getAllBookclass(@PathVariable int sortNum) {
        return ResponseEntity.ok().body(bookclassService.getAllclass(sortNum));
    }

    @GetMapping("/status/list={numList}&status={status}") // update bookclass status
    public ResponseEntity<String> getAllBookclass(@PathVariable List<Long> numList, @PathVariable String status) {
        bookclassService.chageStatus(numList, status);
        return ResponseEntity.ok().body("success");
    }

}
