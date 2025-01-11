package com.springboot.backend.requestModels;

import java.util.Objects;

public class AddBookRequest {

    private String title;
    private String author;
    private String description;
    private int copies;
    private String category;
    private String img;

    public AddBookRequest() {
    }

    public AddBookRequest(String title, String author, String description, int copies, String category, String img) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
        this.img = img;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCopies() {
        return copies;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "AddBookRequest{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", copies=" + copies +
                ", category='" + category + '\'' +
                ", img='" + img + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddBookRequest that = (AddBookRequest) o;
        return copies == that.copies && Objects.equals(title, that.title) && Objects.equals(author, that.author) && Objects.equals(description, that.description) && Objects.equals(category, that.category) && Objects.equals(img, that.img);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, author, description, copies, category, img);
    }
}
