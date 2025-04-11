package com.project.Franchise.controller;

import com.project.Franchise.model.CustomerReview;
import com.project.Franchise.repository.ReviewRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")

public class ReviewController {

    private final ReviewRepository repo;

    public ReviewController(ReviewRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<CustomerReview> createReview(@RequestBody CustomerReview review) {
        CustomerReview savedReview = repo.save(review);
        return ResponseEntity.ok(savedReview); // 상태 200 OK와 함께 저장된 리뷰 반환
    }

    @GetMapping
    public ResponseEntity<List<CustomerReview>> getAll() {
        List<CustomerReview> reviews = repo.findAll();
        return ResponseEntity.ok(reviews); // 상태 200 OK와 함께 리뷰 리스트 반환
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
