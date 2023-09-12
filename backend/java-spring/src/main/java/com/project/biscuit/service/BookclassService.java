package com.project.biscuit.service;

import com.project.biscuit.model.Bookclass;
import com.project.biscuit.model.BookclassMember;
import com.project.biscuit.model.Books;
import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.BkclassMemReqDto;
import com.project.biscuit.model.dto.BookclassReponseDto;
import com.project.biscuit.model.dto.BookclassRequestDto;
import com.project.biscuit.model.enums.ClassStatus;
import com.project.biscuit.repository.BookclassMemberRepository;
import com.project.biscuit.repository.BookclassRepository;
import com.project.biscuit.repository.BooksRepository;
import com.project.biscuit.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookclassService {
    private final BookclassRepository bookclassRepository;
    private final BookclassMemberRepository bkclassMemRepository;
    private final BooksRepository booksRepository;
    private final UserRepository userRepository;

    // 재활용하기 위한 함수
    // 클래스 모임 종료 일자 지나면 종료됨(code: E)으로 변경 시키기
    private void checkEndDate(List<Bookclass> bkc) {
        bkc.stream().forEach(item -> {
            Bookclass temp = bookclassRepository.findById(item.getNo()).get();
        }); // 작업중
    }

    // 참여 여부, 클래스 참여 인원 수 response에 반영
    private List<BookclassReponseDto> chkJoinAndNumOfMem(List<Bookclass> bkcList, boolean partyChk, Long userNo) {

        List<Long> cntList = bkcList.stream().map(item -> {
            Long classNo = item.getNo();
            return bkclassMemRepository.countByBookclassNo(classNo);
        }).toList();

        AtomicInteger index = new AtomicInteger(); // index 값을 사용하기 위한 변수 선언
        List<BookclassReponseDto> BkcResDtoList;


        if(partyChk) { // 참여 했는지 안했는지 확인을 할지 말지 결정
            List<Boolean> partyList = bkcList.stream().map(item -> {
                Long classNo = item.getNo();
                return bkclassMemRepository.existsByBookclass_NoAndUser_No(classNo, userNo);
            }).toList();

            BkcResDtoList = bkcList.stream().map(item -> {
                int idx = index.getAndIncrement();
                return new BookclassReponseDto(item, partyList.get(idx), cntList.get(idx));
            }).toList();
        }
        else {
            BkcResDtoList = bkcList.stream().map(item -> {
                int idx = index.getAndIncrement();
                return new BookclassReponseDto(item, false, cntList.get(idx));
            }).toList();
        }

        return BkcResDtoList;
    }

    // --------------------

    // Create Bookclass
    @Transactional
    public BookclassReponseDto apply(BookclassRequestDto req) {
        Optional<Books> optBooks = booksRepository.findByIsbn(req.getIsbn());
        Optional<User> optUser = userRepository.findByUserId(req.getUserId());
        Bookclass bookclass = req.toEntity(optUser.get(), optBooks.get());

        Bookclass savedBkc = bookclassRepository.save(bookclass);
        bkclassMemRepository.save(BookclassMember.toEntity(savedBkc, optUser.get()));

        return new BookclassReponseDto(savedBkc, true, 1L);
    }

    // Read : All Bookclass with status Y
    public List<BookclassReponseDto> getBookclassAll(Long userNo) {
        List<Bookclass> bkcList = bookclassRepository.findByStatusOrderByUpdatedAtDesc(ClassStatus.Y);
        if(userNo == null) return chkJoinAndNumOfMem(bkcList, false, null);
        else return chkJoinAndNumOfMem(bkcList, true, userNo);
    }

    // Read : Bookclass Detail
    public BookclassReponseDto getBookclass(long classNo, Long userNo) {
        Bookclass bkc = bookclassRepository.findById(classNo).orElseThrow(() -> new IllegalArgumentException("not found : " + classNo));

        if(userNo != 0L) {
            boolean partyChk = bkclassMemRepository.existsByBookclass_NoAndUser_No(classNo, userNo);
            Long cnt = bkclassMemRepository.countByBookclassNo(classNo);

            return new BookclassReponseDto(bkc, partyChk, cnt);
        } else {
            Long cnt = bkclassMemRepository.countByBookclassNo(classNo);

            return new BookclassReponseDto(bkc, false, cnt);
        }
    }

    // Read : Bookclass for edit
    public Bookclass getBookclassForEdit(long bookclassId) {
        return bookclassRepository.findById(bookclassId).orElseThrow(
                () -> new IllegalArgumentException("not found : " + bookclassId)
        );
    }

    // Update : Bookclass
    @Transactional // 트랜잭션 메서드 : DB에서 데이터를 바꾸기 위한 작업 단위 (ex: 계좌이체(AtoB) => A계좌 출금 후, B계좌 입금)
    public Bookclass update(Long bookclassId, BookclassRequestDto req) {
        Bookclass bookclass = bookclassRepository.findById(bookclassId).orElseThrow(
                () -> new IllegalArgumentException("not found : " + bookclassId)
        );

        Optional<Books> book = booksRepository.findByIsbn(req.getIsbn());
        return bookclassRepository.save(bookclass.update(req, book));
    }

    // 북클래스 제목, 작성자 이름으로 검색
    public List<BookclassReponseDto> searchClass(String keyword, Long userNo) {
        List<Bookclass> byTitle = bookclassRepository.findByTitleContaining(keyword);
        List<Bookclass> byName = bookclassRepository.findByUserNo_NicknameContaining(keyword);
        List<Bookclass> bckList = new ArrayList<>();
        bckList.addAll(byTitle);
        bckList.addAll(byName);

        byName.forEach(ia -> {
            byTitle.forEach(ib -> {
                if(ib.getNo().equals(ia.getNo())) {
                    bckList.remove(ia);
                }
            });
        });
        if(userNo == null) return chkJoinAndNumOfMem(byTitle, false, null);
        return chkJoinAndNumOfMem(byTitle, true, userNo);
    }


    // 사용자 action ----
    // 클래스 참여
    public String inClass(BkclassMemReqDto req) {
        boolean inChk = bkclassMemRepository.existsByBookclass_NoAndUser_No(req.getBookclassNo(), req.getUserNo());
        if(inChk) {
            return "already in";
        } else {
            Bookclass bkc = bookclassRepository.findById(req.getBookclassNo()).orElseThrow(() -> new IllegalArgumentException("Not Exist Class"));
            Long nowCnt = bkclassMemRepository.countByBookclassNo(req.getBookclassNo());

            if(nowCnt < bkc.getMemberCnt()) {
                Optional<User> optUser = userRepository.findById(req.getUserNo());

                BookclassMember bckmember = BookclassMember.toEntity(bkc, optUser.get());
                bkclassMemRepository.save(bckmember);

                return "success";
            } else {
                return "max";
            }

        }
    }

    // 클래스 참여 취소
    public String outClass(BkclassMemReqDto req) {
        boolean inChk = bkclassMemRepository.existsByBookclass_NoAndUser_No(req.getBookclassNo(), req.getUserNo());
        if(!inChk) {
            return "not in";
        } else {
            Optional<BookclassMember> optBkcMem = bkclassMemRepository.findByBookclass_NoAndUser_No(req.getBookclassNo(), req.getUserNo());
            BookclassMember bkcMem = optBkcMem.get();

//            bkcMem.setDelyn("Y");
//            bkclassMemRepository.save(bkcMem);

            bkclassMemRepository.deleteById(bkcMem.getNo());

            return "Success";
        }
    }

    // 사용자의 북클래스 개설 목록 가져오기
    public List<BookclassReponseDto> getOpenedClass(BkclassMemReqDto req) {
        List<Bookclass> bkcList = switch (req.getSortNum()) {
            case 0 -> bookclassRepository.findByUserNo_NoOrderByCreatedAtDesc(req.getUserNo()); // 전체 (정렬 기준)
            case 1 -> bookclassRepository.findByUserNo_NoOrderByCreatedAtDesc(req.getUserNo())
                    .stream().filter(item -> item.getStatus().equals(ClassStatus.Y))
                    .collect(Collectors.toList()); // 모집중 상태
            case 2 -> bookclassRepository.findByUserNo_NoOrderByCreatedAtDesc(req.getUserNo())
                    .stream().filter(item -> item.getStatus().equals(ClassStatus.A))
                    .collect(Collectors.toList()); // 신청중 상태
            default -> throw new IllegalStateException("Unexpected value: " + req.getSortNum());
        };
        return chkJoinAndNumOfMem(bkcList, false, null);
    }

    // 사용자의 북클래스 참여 목록 가져오기
    public List<BookclassReponseDto> getParticipatedClass(BkclassMemReqDto req) {
        List<BookclassMember> bkmcList = switch (req.getSortNum()) {
            case 0 -> bkclassMemRepository.findByUser_NoOrderByCreatedAtDesc(req.getUserNo()); // 전체 (정렬 기준)
            case 1 -> bkclassMemRepository.findByUser_NoOrderByCreatedAtDesc(req.getUserNo())
                    .stream().filter(item -> item.getBookclass().getStatus().equals(ClassStatus.Y))
                    .collect(Collectors.toList()); // 모집중 상태
            case 2 -> bkclassMemRepository.findByUser_NoOrderByCreatedAtDesc(req.getUserNo())
                    .stream().filter(item -> item.getBookclass().getStatus().equals(ClassStatus.E))
                    .collect(Collectors.toList()); // 종료됨 상태
            default -> throw new IllegalStateException("Unexpected value: " + req.getSortNum());
        };

        List<Long> cntList = bkmcList.stream().map(item -> {
            Long classNo = item.getBookclass().getNo();
            return bkclassMemRepository.countByBookclassNo(classNo);
        }).toList();

        AtomicInteger index = new AtomicInteger();
        List<BookclassReponseDto> BkcResDtoList = bkmcList.stream().map(item -> {
            int idx = index.getAndIncrement();
            return new BookclassReponseDto(item, false, cntList.get(idx));
        }).toList();

        return BkcResDtoList;
    }


    // 관리자 기능 =====
    // Delete : Bookclass
    public void delete(Long bookclassId) {
        bookclassRepository.deleteById(bookclassId);
    };

    // 전체 목록 및 승인해야할 목록 가져오기
    public List<BookclassReponseDto> getAllclass(int sortNum) {
        if(sortNum == 1) { // 승인해야할 목록
            List<Bookclass> bkcList = bookclassRepository.findByStatusOrderByUpdatedAtDesc(ClassStatus.A);
            return chkJoinAndNumOfMem(bkcList, false, null);
        }
        else { // 전체 목록
            List<Bookclass> bkcList = bookclassRepository.findAll();
            return chkJoinAndNumOfMem(bkcList, false, null);
        }
    };

    // 북클래스 상태 변경
    @Transactional
    public void chageStatus(List<Long> numList, String status) {
        numList.forEach(e -> {
            Bookclass bkc = bookclassRepository.findById(e).orElseThrow(() -> new IllegalArgumentException("not found class"));
            bkc.setStatus(ClassStatus.valueOf(status));
        });
    }

}
