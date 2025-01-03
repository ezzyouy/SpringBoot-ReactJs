package com.springboot.backend.respositories;

import com.springboot.backend.entities.Checkout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
    //Page<Checkout> findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);
    Checkout findByUserEmailAndBookId( @RequestParam("user_email") String UserEmail, @RequestParam("book_id") Long bookId);
    List<Checkout> findUsersByUserEmail(String UserEmail);
}
