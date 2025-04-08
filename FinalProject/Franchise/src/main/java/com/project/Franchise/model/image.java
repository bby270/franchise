package com.project.Franchise.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "이미지")
public class image {
    @Id
    private Long id;
    @Column(name = "image_url")
    private String imageUrl;
}

