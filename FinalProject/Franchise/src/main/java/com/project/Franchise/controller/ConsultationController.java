package com.project.Franchise.controller;

// 모델과 리포지토리 import
import com.project.Franchise.model.ConsultationInquiries;
import com.project.Franchise.repository.ConsultationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 이 클래스가 REST API 컨트롤러임을 명시 (JSON 반환)
@RequestMapping("/api/inquiry") // 기본 URL 경로: /api/inquiry
@CrossOrigin(origins = "*") // 모든 도메인에서의 요청 허용 (CORS 허용)
public class ConsultationController {

    private final ConsultationRepository repository; // DB 접근을 위한 리포지토리

    // 생성자를 통한 의존성 주입
    public ConsultationController(ConsultationRepository repository) {
        this.repository = repository;
    }

    @PostMapping // POST 요청 처리: 상담 문의 저장
    public ConsultationInquiries saveInquiry(@RequestBody ConsultationInquiries inquiry) {
        // 클라이언트에서 받은 상담 문의 데이터를 DB에 저장 후 반환
        return repository.save(inquiry);
    }

    @GetMapping // GET 요청 처리: 모든 상담 문의 조회
    public List<ConsultationInquiries> getAllInquiries() {
        // DB에 저장된 모든 상담 문의 데이터를 리스트로 반환
        return repository.findAll();
    }
}
