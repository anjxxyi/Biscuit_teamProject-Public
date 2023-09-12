package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class BookclassMember  extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '북클래스 번호'")
    private Long no;

    @Builder.Default
    @Column(columnDefinition = "varchar(1) comment '신청여부'", nullable = false)
    private String delyn = "N";

    // join column
    @ManyToOne
    @JoinColumn(name = "Bookclass_no")
    @ToString.Exclude
    private Bookclass bookclass;

    // join column
    @ManyToOne
    @JoinColumn(name = "User_no")
    @ToString.Exclude
    private User user;

    public static BookclassMember toEntity(Bookclass bkc, User user) {
        return BookclassMember.builder()
                .user(user)
                .bookclass(bkc)
                .build();
    }

}
