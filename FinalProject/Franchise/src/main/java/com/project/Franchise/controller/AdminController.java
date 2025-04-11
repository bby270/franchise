package com.project.Franchise.controller;

import com.project.Franchise.model.Admin;
import com.project.Franchise.repository.AdminRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Admin loginData) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(loginData.getUsername());
        return adminOpt.isPresent() && adminOpt.get().getPassword().equals(loginData.getPassword());
    }
}
