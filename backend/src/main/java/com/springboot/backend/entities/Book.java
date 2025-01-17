package com.springboot.backend.entities;


//import jakarta.persistence.*;
import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "description")
    private String description;
    @Column(name = "copies")
    private int copies;
    @Column(name="copies_available")
    private int copiesAvailable;
    @Column(name = "category")
    private String category;
    @Column(name = "img")
    private String img;

    public Book() {}

    public Book(Long id, String title, String author, String description, int copies, int copies_available, String category, String img) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copies_available;
        this.category = category;
        this.img = img;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getCopies_available() {
        return copiesAvailable;
    }

    public void setCopies_available(int copies_available) {
        this.copiesAvailable = copies_available;
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
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", copies=" + copies +
                ", copies_available=" + copiesAvailable +
                ", category='" + category + '\'' +
                ", img='" + img + '\'' +
                '}';
    }


}
