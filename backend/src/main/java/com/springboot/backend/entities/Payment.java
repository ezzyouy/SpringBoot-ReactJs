package com.springboot.backend.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "user_email")
    private String userEmail;
    private double amount;

    public Payment() {}

    public Payment(long id, String userEmail, double amount) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Payment payment = (Payment) o;
        return id == payment.id && Double.compare(amount, payment.amount) == 0 && Objects.equals(userEmail, payment.userEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userEmail, amount);
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", amount=" + amount +
                '}';
    }
}
