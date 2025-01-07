package com.springboot.backend.respositories;

import com.springboot.backend.entities.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History,Long> {

     Page<History> findByUserEmail(@RequestParam("userEmail") String userEmail, Pageable pageable);

}
