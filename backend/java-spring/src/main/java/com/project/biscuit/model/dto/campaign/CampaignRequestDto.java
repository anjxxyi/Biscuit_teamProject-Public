package com.project.biscuit.model.dto.campaign;

import com.project.biscuit.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CampaignRequestDto {
    private Long recycleNo;
    private String acceptYn;
    private Status status;
    private Long discountRate;
    private Long salePrice;
}
