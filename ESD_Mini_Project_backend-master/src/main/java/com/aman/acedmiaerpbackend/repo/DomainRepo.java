package com.aman.acedmiaerpbackend.repo;

import com.aman.acedmiaerpbackend.entity.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepo extends JpaRepository<Domain, Integer> {
}