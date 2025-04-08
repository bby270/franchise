package com.project.Franchise.repository;

import com.project.Franchise.model.ConsultationInquiries;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository<ConsultationInquiries, Long> {
}
