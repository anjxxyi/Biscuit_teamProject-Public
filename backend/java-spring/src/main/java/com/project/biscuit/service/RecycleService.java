package com.project.biscuit.service;

import com.project.biscuit.model.Books;
import com.project.biscuit.model.Recycle;
import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.campaign.AddRecycleRequestDto;
import com.project.biscuit.model.dto.campaign.CampaignRequestDto;
import com.project.biscuit.model.dto.campaign.CampaignResponseDto;
import com.project.biscuit.model.dto.campaign.SaleCampaignRequestDto;
import com.project.biscuit.repository.BooksRepository;
import com.project.biscuit.repository.RecycleRepository;
import com.project.biscuit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecycleService {
    private final RecycleRepository recycleRepository;
    private final BooksRepository booksRepository;
    private final UserRepository userRepository;

    /** 중고 도서 접수 */
    public CampaignResponseDto apply(AddRecycleRequestDto requestDto) {
        Optional<Books> books = booksRepository.findByIsbn(requestDto.getIsbn());
        Optional<User> user = userRepository.findByUserId(requestDto.getUserId());
        Recycle recycle = requestDto.toEntity(user.get(), books.get());
        return CampaignResponseDto.of(recycleRepository.save(recycle));
    }

    /** 승인된 게시글 전체 조회 */
    public List<Recycle> findAllAcceptY(String y) {
        return recycleRepository.findAllByAcceptYn(y);
    }

    /** 전체 게시글 조회 (관리자만 보임)*/
    public List<Recycle> findAll() {
        return recycleRepository.findAll();
    }

    /** 상세페이지 */
    public Recycle recycleView(Long recycleNo) {
        recycleRepository.updateCount(recycleNo);
        return recycleRepository.findByRecycleNo(recycleNo).orElseThrow(
                () -> new IllegalArgumentException("not found :" + recycleNo)
        );
    }
    
    /** 구매여부 변경 */
    @Transactional
    public void updateSaleYn(Long recycleNo, SaleCampaignRequestDto dto){
        Recycle recycle = recycleRepository.findByRecycleNo(recycleNo).orElseThrow(() ->
                new IllegalArgumentException("해당 캠페인이 존재 하지 않습니다."));
        String sale = dto.getSaleYn();
        recycle.updateSaleYn(sale);
    }

    /** 관리자 허용여부 */
    @Transactional
    public void updateAccept(CampaignRequestDto dto){
        Recycle recycle = recycleRepository.findByRecycleNo(dto.getRecycleNo()).orElseThrow(() ->
                new IllegalArgumentException("해당 캠페인이 존재 하지 않습니다."));

        recycle.updateAccept(
                dto.getAcceptYn(),
                dto.getStatus(),
                dto.getDiscountRate(),
                dto.getSalePrice()
        );
    }

    /** 조회수 */
    @Transactional
    public int updateCnt(Long recycleNo){
        return recycleRepository.updateCount(recycleNo);
    }


}
