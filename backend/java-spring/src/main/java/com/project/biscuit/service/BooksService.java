package com.project.biscuit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.project.biscuit.model.Bookclip;
import com.project.biscuit.model.Books;
import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.books.BooksRequestDto;
import com.project.biscuit.model.dto.books.BooksResponseDto;
import com.project.biscuit.repository.BookclipRepository;
import com.project.biscuit.repository.BooksRepository;
import com.project.biscuit.repository.UserRepository;
import com.project.biscuit.util.NaverBookAPI;
import com.project.biscuit.util.NaverBookInfoCrawling;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BooksService {

    private final NaverBookAPI naverBookAPI;
    private final NaverBookInfoCrawling naverCrawling;
    private final ObjectMapper objectMapper;
    private final BooksRepository booksRepository;
    private final BookclipRepository bookclipRepository;
    private final UserRepository userRepository;

    // 도서 검색 결과
    public String searchBooks(BooksRequestDto req) {
        return naverBookAPI.searchBook(req.getTitle(), req.getDisplay(), req.getSort(), req.getStart());
    }

    // 도서 한권 정보
    public BooksResponseDto searchBookInfo(BooksRequestDto req) throws IOException, InterruptedException {
        Optional<Books> optBooks = booksRepository.findByIsbn(req.getIsbn());
        Optional<User> optUser = userRepository.findByUserId(req.getUserId());

        if(optBooks.isEmpty()) {
            String json = naverBookAPI.searchBookByIsbn(req.getIsbn());
            JsonNode jsonNode = parseJsonNode(json);
            Books book = parseBooksObj(jsonNode);

            booksRepository.save(book);

            boolean chkClip;
            if(optUser.isPresent()) chkClip = bookclipRepository.existsByBooks_NoAndUser_NoAndDelYn(book.getNo(), optUser.get().getNo(), "N");
            else chkClip = false;

            return BooksResponseDto.of(book, chkClip);

        } else {
            boolean chkClip;
            if(optUser.isPresent()) chkClip = bookclipRepository.existsByBooks_NoAndUser_NoAndDelYn(optBooks.get().getNo(), optUser.get().getNo(), "N");
            else chkClip = false;

            return BooksResponseDto.of(optBooks.get(), chkClip);
        }
    }

    // 도서 찜 목록에 저장
    // 찜목록에 DelYn = "N"인 경우는 프론트에서 실행 막음
    public String inClip(BooksRequestDto req) {
        Optional<Books> optBooks = booksRepository.findByIsbn(req.getIsbn());
        Optional<User> optUser = userRepository.findByUserId(req.getUserId());
        Optional<Bookclip> optBookClip = bookclipRepository.findByBooks_NoAndUser_No(optBooks.get().getNo(), optUser.get().getNo());

        if(optBooks.isPresent() & optUser.isPresent()) {
            Bookclip bookclip;
            if(optBookClip.isPresent()) { // 삭제된 상태의 기존 북클립이 있는 경우
                bookclip = optBookClip.get();
                bookclip.setDelYn("N");

            } else { // 북클립을 완전히 새로 추가하는 경우
                bookclip = Bookclip.builder()
                        .books(optBooks.get())
                        .user(optUser.get())
                        .build();

            }
            bookclipRepository.save(bookclip);
            return parseJson(bookclip);
        }
        return "{\"result\": \"error\"}";
    }


    // Java Object => String Json
    private String parseJson(Object obj) {
        ObjectMapper om = new ObjectMapper();
        om.registerModule(new JavaTimeModule());
        JsonNode jsonNode = om.valueToTree(obj);
        return jsonNode.toString();
    }

    // String Json => JsonNode
    private JsonNode parseJsonNode(String json) throws JsonProcessingException {
        return objectMapper.readTree(json);
    }

    // JsonNode => Books Object
    private Books parseBooksObj(JsonNode jsonNode) throws IOException, InterruptedException {
        JsonNode bInfo = jsonNode.get("items").get(0);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd HH:mm:ss.SSS");
//        JsonNode bDtl = objectMapper.readTree(naverCrawling.searchMakersInfo(bInfo.get("link").asText()));

        return Books.builder()
                .isbn(bInfo.get("isbn").asText())
                .title(bInfo.get("title").asText())
                .bookDtlUrl(bInfo.get("link").asText())
                .bookImgUrl(bInfo.get("image").asText())
                .author(bInfo.get("author").asText())
                .publisher(bInfo.get("publisher").asText())
                .publishedDate(LocalDateTime.parse(bInfo.get("pubdate").asText() + " 00:00:00.000", formatter))
                .detail(bInfo.get("description").asText())
                .price(Long.parseLong(bInfo.get("discount").asText()))
//                .authorDetail(bDtl.get("authorDetail").asText())
//                .translator(bDtl.get("translator").asText())
//                .transDetail(bDtl.get("translatorDetail").asText())
                .build();
    }

}
