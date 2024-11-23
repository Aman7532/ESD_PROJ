package com.aman.acedmiaerpbackend.repo;

import com.aman.acedmiaerpbackend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmail(String email);
}
