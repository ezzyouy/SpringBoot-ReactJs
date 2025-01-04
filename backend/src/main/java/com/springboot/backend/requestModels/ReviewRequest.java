package com.springboot.backend.requestModels;

import java.util.Objects;
import java.util.Optional;

public class ReviewRequest {

    private double rating;
    private Long bookId;
    private Optional<String> reviewDescription;

    public ReviewRequest() {
    }

    public ReviewRequest(double rating, Long bookId, Optional<String> reviewDescription) {
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription = reviewDescription;
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

    public Optional<String> getReviewDescription() {
        return reviewDescription;
    }

    public void setReviewDescription(Optional<String> reviewDescription) {
        this.reviewDescription = reviewDescription;
    }

    @Override
    public String toString() {
        return "ReviewRequest{" +
                "rating=" + rating +
                ", bookId=" + bookId +
                ", reviewDescription=" + reviewDescription +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewRequest that = (ReviewRequest) o;
        return Double.compare(rating, that.rating) == 0 && Objects.equals(bookId, that.bookId) && Objects.equals(reviewDescription, that.reviewDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rating, bookId, reviewDescription);
    }
}
