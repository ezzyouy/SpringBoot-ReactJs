package com.springboot.backend.responsemodels;

import com.springboot.backend.entities.Book;

import java.util.Objects;

public class ShelfCurrentLoansResponse {

    private Book book;
    private int daysLeft;

    public ShelfCurrentLoansResponse() {
    }

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(int daysLeft) {
        this.daysLeft = daysLeft;
    }

    @Override
    public String toString() {
        return "ShelfCurrentLoansResponse{" +
                "book=" + book +
                ", daysLeft=" + daysLeft +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShelfCurrentLoansResponse that = (ShelfCurrentLoansResponse) o;
        return daysLeft == that.daysLeft && Objects.equals(book, that.book);
    }

    @Override
    public int hashCode() {
        return Objects.hash(book, daysLeft);
    }
}
