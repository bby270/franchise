package com.project.Franchise.controller;
import com.project.Franchise.model.ConsultationInquiries;
import com.project.Franchise.repository.ConsultationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiry")
@CrossOrigin(origins = "*") // 프론트 연동 허용
public class ConsultationController {

    private final ConsultationRepository repository;

    public ConsultationController(ConsultationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ConsultationInquiries saveInquiry(@RequestBody ConsultationInquiries inquiry) {
        return repository.save(inquiry);
    }

    @GetMapping
    public List<ConsultationInquiries> getAllInquiries() {
        return repository.findAll();
    }
}
