package com.project.Franchise.controller;

import com.project.Franchise.model.ConsultationInquiries;
import com.project.Franchise.repository.ConsultationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiry")
@CrossOrigin(origins = "*")
public class ConsultationController {

    private final ConsultationRepository repository;

    public ConsultationController(ConsultationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ConsultationInquiries> saveInquiry(@RequestBody ConsultationInquiries inquiry) {
        ConsultationInquiries savedInquiry = repository.save(inquiry);
        return ResponseEntity.ok(savedInquiry); // 상태 200 OK 반환
        // 또는 ResponseEntity.status(HttpStatus.CREATED).body(savedInquiry);
    }

    @GetMapping
    public ResponseEntity<List<ConsultationInquiries>> getAllInquiries() {
        List<ConsultationInquiries> inquiries = repository.findAll();
        return ResponseEntity.ok(inquiries);
    }
}
