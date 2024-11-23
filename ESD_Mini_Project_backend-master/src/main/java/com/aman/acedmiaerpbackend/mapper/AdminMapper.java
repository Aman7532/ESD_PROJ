package com.aman.acedmiaerpbackend.mapper;

import com.aman.acedmiaerpbackend.dto.AdminRequest;
import com.aman.acedmiaerpbackend.entity.Admin;
import org.springframework.stereotype.Service;

@Service
public class AdminMapper {

    public Admin toEntity(AdminRequest request) {
        return Admin.builder()
                .email(request.email())
                .password(request.password())
                .build();
    }
}
