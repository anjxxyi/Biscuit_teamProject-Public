package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class Gonggam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '공감번호'")
    private Long no;

    @ManyToOne
    @ToString.Exclude
    private User user;

    @ManyToOne
    @ToString.Exclude
    private BooklogArticle booklogArticle;
}
