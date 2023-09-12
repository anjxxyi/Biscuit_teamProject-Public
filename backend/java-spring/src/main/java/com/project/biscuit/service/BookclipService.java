package com.project.biscuit.service;

import com.project.biscuit.model.Bookclip;
import com.project.biscuit.model.dto.books.BookClipRequestDto;
import com.project.biscuit.model.dto.books.BookClipResponseDto;
import com.project.biscuit.model.view.BookclipAndBookcnt;
import com.project.biscuit.repository.BookclipAndBookcntRepository;
import com.project.biscuit.repository.BookclipRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookclipService {

    private final BookclipRepository bookclipRepository;
    private final BookclipAndBookcntRepository bkcabRepository;
    private final EntityManager em;

    // 사용자의 북클립 목록 가져오기

    public List<BookClipResponseDto> getMyClips(BookClipRequestDto req) {
        switch (req.getSortNum()) {
            case 0 -> {
                return bookclipRepository.findByDelYnAndUser_NoOrderByUpdatedAtDesc("N", req.getUserNo())
                        .stream().map(BookClipResponseDto::new).toList();
            }
            case 1 -> {
                return bookclipRepository.findByDelYnAndUser_NoOrderByBooks_Price("N", req.getUserNo())
                        .stream().map(BookClipResponseDto::new).toList();
            }
            case 2 -> {
                List<Bookclip> listClip = bookclipRepository.findByDelYnAndUser_No("N", req.getUserNo());
                List<BookclipAndBookcnt> listCnt = bkcabRepository.findByUserNoOrderByBcntDescUpdatedAtDesc(req.getUserNo());

                return listCnt.stream().map(item -> {
                    List<Bookclip> oneClip = listClip.stream().filter(clip -> item.getBooksNo() == clip.getBooks().getNo()).toList();

                    return new BookClipResponseDto(oneClip.get(0), item);
                }).toList();
            }
        }
        return null;
    }

    // 사용자의 북클립 삭제 처리
    public String delMyClip(BookClipRequestDto req) {
        Optional<Bookclip> optBookClip = bookclipRepository.findByBooks_NoAndUser_No(req.getBookNo(), req.getUserNo());

        if(optBookClip.isPresent()) {
            Bookclip bookClip = optBookClip.get();
            bookClip.setDelYn("Y");

            bookclipRepository.save(bookClip);
            return "{\"result\": \"success\"}";
        }
        return "error";
    }
}
