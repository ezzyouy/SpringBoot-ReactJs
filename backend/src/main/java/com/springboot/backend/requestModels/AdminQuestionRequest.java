package com.springboot.backend.requestModels;

import java.util.Objects;
import java.util.Optional;

public class AdminQuestionRequest {


    private Long id;
    private String response;

    public AdminQuestionRequest() {
    }

    public AdminQuestionRequest(Long id, String response) {
        this.id = id;
        this.response = response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "AdminQuestionRequest{" +
                "id=" + id +
                ", response='" + response + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdminQuestionRequest that = (AdminQuestionRequest) o;
        return Objects.equals(id, that.id) && Objects.equals(response, that.response);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, response);
    }
}
