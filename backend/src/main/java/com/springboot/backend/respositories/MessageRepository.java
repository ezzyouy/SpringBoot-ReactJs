package com.springboot.backend.respositories;

import com.springboot.backend.entities.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;


public interface MessageRepository extends JpaRepository<Messages, Long> {

    Page<Messages> findByUserEmail(@RequestParam String userEmail, Pageable pageable);

    Page<Messages> findByClosed(@RequestParam("closed") Boolean closed, Pageable pageable);
}
