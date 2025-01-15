package com.springboot.backend.respositories;

import com.springboot.backend.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Payment findPaymentByUserEmail(String userEmail);
}
