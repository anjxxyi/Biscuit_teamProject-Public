package com.project.biscuit.controller;

import com.project.biscuit.model.dto.books.BookClipRequestDto;
import com.project.biscuit.model.dto.books.BooksRequestDto;
import com.project.biscuit.model.dto.books.BooksResponseDto;
import com.project.biscuit.service.BookclipService;
import com.project.biscuit.service.BooksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BooksService booksService;
    private final BookclipService bookclipService;

    @PostMapping("/list")
    public String bookList(@RequestBody BooksRequestDto req) {
        return booksService.searchBooks(req);
    }

    @PostMapping("/info")
    public ResponseEntity<BooksResponseDto> bookInfo(@RequestBody BooksRequestDto req) throws IOException, InterruptedException {
        return ResponseEntity.ok(booksService.searchBookInfo(req));
    }

    @PostMapping("/clip")
    public String bookClip(@RequestBody BooksRequestDto req) {
        return booksService.inClip(req);
    }

    @PutMapping("/delclip")
    public String delBookClip(@RequestBody BookClipRequestDto req) {
        return bookclipService.delMyClip(req);
    }
}
