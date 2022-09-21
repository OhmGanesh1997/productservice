package com.manage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.manage.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	
}

