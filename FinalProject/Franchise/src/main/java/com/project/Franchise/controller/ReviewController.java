package com.project.Franchise.controller;

import com.project.Franchise.model.CustomerReview;
import com.project.Franchise.repository.ReviewRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewRepository repo;

    public ReviewController(ReviewRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public CustomerReview createReview(@RequestBody CustomerReview review) {
        return repo.save(review);
    }

    @GetMapping
    public List<CustomerReview> getAll() {
        return repo.findAll();
    }
}
