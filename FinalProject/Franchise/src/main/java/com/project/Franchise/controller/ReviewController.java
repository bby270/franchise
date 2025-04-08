package com.project.Franchise.controller;

// 고객 후기 모델 및 JPA 리포지토리 불러오기
import com.project.Franchise.model.CustomerReview;
import com.project.Franchise.repository.ReviewRepository;

// 스프링 웹 관련 어노테이션
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // REST API 컨트롤러로 설정 (JSON 반환)
@RequestMapping("/api/review") // 이 컨트롤러의 기본 URL 경로
@CrossOrigin(origins = "*") // CORS 허용 (모든 출처 허용)
public class ReviewController {

    private final ReviewRepository repo; // 후기 관련 DB 처리 객체

    // 생성자를 통해 repo 주입 (생성자 주입 방식)
    public ReviewController(ReviewRepository repo) {
        this.repo = repo;
    }

    @PostMapping // POST 요청 처리 (후기 등록용)
    public CustomerReview createReview(@RequestBody CustomerReview review) {
        // JSON 요청 본문을 CustomerReview 객체로 받아 DB에 저장하고 반환
        return repo.save(review);
    }

    @GetMapping // GET 요청 처리 (모든 후기 조회용)
    public List<CustomerReview> getAll() {
        // DB에서 모든 리뷰를 조회해서 리스트로 반환
        return repo.findAll();
    }
}

