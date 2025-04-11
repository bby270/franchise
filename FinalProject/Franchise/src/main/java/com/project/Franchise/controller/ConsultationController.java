package com.project.Franchise.controller;

import com.project.Franchise.model.ConsultationInquiries;
import com.project.Franchise.repository.ConsultationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultation")
public class ConsultationController {

    private final ConsultationRepository repository;

    public ConsultationController(ConsultationRepository repository) {
        this.repository = repository;
    }
    //일반문의
    @PostMapping
    public ResponseEntity<ConsultationInquiries> saveInquiry(@RequestBody ConsultationInquiries inquiry) {
        ConsultationInquiries savedInquiry = repository.save(inquiry);
        return ResponseEntity.ok(savedInquiry); // 상태 200 OK 반환
        // 또는 ResponseEntity.status(HttpStatus.CREATED).body(savedInquiry);
    }
    //간단문의
    @PostMapping("/simple")
    public ResponseEntity<ConsultationInquiries> saveSimpleInquiry(@RequestBody ConsultationInquiries inquiry) {
        ConsultationInquiries saved = repository.save(inquiry);
        return ResponseEntity.ok(saved);
    }

    //전체문의 목록 조회
    @GetMapping
    public ResponseEntity<List<ConsultationInquiries>> getAllInquiries() {
        List<ConsultationInquiries> inquiries = repository.findAll();
        return ResponseEntity.ok(inquiries);
    }
    @DeleteMapping("/simple/{id}")
    public ResponseEntity<Void> deleteSimpleInquiry(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
