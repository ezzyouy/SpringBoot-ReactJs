package com.springboot.backend.entities;

//import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    @CreationTimestamp
    private Date date;
    private double rating;
    private Long bookId;
    private String review_description;

    public Review() {
    }

    public Review(Long id, String user_email, Date date, double rating, Long bookId, String review_description) {
        this.id = id;
        this.userEmail = user_email;
        this.date = date;
        this.rating = rating;
        this.bookId = bookId;
        this.review_description = review_description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String user_email) {
        this.userEmail = user_email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }


    public String getReview_description() {
        return review_description;
    }

    public void setReview_description(String review_description) {
        this.review_description = review_description;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", user_email='" + userEmail + '\'' +
                ", date=" + date +
                ", rating=" + rating +
                ", bookId=" + bookId +
                ", review_description='" + review_description + '\'' +
                '}';
    }
}
