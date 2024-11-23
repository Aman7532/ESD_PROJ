package com.aman.acedmiaerpbackend.repo;

import com.aman.acedmiaerpbackend.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrgRepo extends JpaRepository<Organization, Integer> {
}
