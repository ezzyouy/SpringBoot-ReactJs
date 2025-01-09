package com.springboot.backend.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "title")
    private String title;
    @Column(name = "question")
    private String question;
    @Column(name = "admin_email")
    private String adminEmail;
    @Column(name = "response")
    private String response;
    @Column(name = "closed")
    private boolean closed;

    public Messages() {
    }

    public Messages(Long id, String userEmail, String title, String question, String adminEmail, String response, boolean closed) {
        this.id = id;
        this.userEmail = userEmail;
        this.title = title;
        this.question = question;
        this.adminEmail = adminEmail;
        this.response = response;
        this.closed = closed;
    }

    public Messages(String title, String question) {
        this.title = title;
        this.question = question;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    @Override
    public String toString() {
        return "Message{" + "id=" + id + ", userEmail='" + userEmail + '\'' + ", title='" + title + '\'' + ", question='" + question + '\'' + ", adminEmail='" + adminEmail + '\'' + ", response='" + response + '\'' + ", closed=" + closed + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Messages messages = (Messages) o;
        return closed == messages.closed && Objects.equals(id, messages.id) && Objects.equals(userEmail, messages.userEmail) && Objects.equals(title, messages.title) && Objects.equals(question, messages.question) && Objects.equals(adminEmail, messages.adminEmail) && Objects.equals(response, messages.response);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userEmail, title, question, adminEmail, response, closed);
    }
}
