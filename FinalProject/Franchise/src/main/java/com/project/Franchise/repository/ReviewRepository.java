package com.project.Franchise.repository;

import com.project.Franchise.model.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<CustomerReview, Long> {}
