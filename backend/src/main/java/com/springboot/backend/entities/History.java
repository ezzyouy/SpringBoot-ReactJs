package com.springboot.backend.entities;


//import jakarta.persistence.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "checkout_date")
    private String checkoutDate;
    @Column(name = "returned_date")
    private String returnedDate;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "author")
    private String author;
    @Column(name = "img")
    private String img;

    public History() {
    }

    public History(Long id, String userEmail, String checkoutDate, String returnedDate, String title, String description, String author, String img) {
        this.id = id;
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.description = description;
        this.author = author;
        this.img = img;
    }

    public History(String userEmail, String checkoutDate, String returnedDate, String title, String description, String author, String img) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.description = description;
        this.author = author;
        this.img = img;
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

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(String checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public String getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(String returnedDate) {
        this.returnedDate = returnedDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "History{" + "id=" + id + ", userEmail='" + userEmail + '\'' + ", checkoutDate='" + checkoutDate + '\'' + ", returnedDate='" + returnedDate + '\'' + ", title=" + title + ", description=" + description + ", author='" + author + '\'' + ", img='" + img + '\'' + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        History history = (History) o;
        return title == history.title && description == history.description && Objects.equals(id, history.id) && Objects.equals(userEmail, history.userEmail) && Objects.equals(checkoutDate, history.checkoutDate) && Objects.equals(returnedDate, history.returnedDate) && Objects.equals(author, history.author) && Objects.equals(img, history.img);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userEmail, checkoutDate, returnedDate, title, description, author, img);
    }
}
