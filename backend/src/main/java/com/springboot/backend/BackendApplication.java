package com.springboot.backend;

import com.springboot.backend.entities.Book;
import com.springboot.backend.respositories.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    /*@Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository) {
        return args -> {
            bookRepository.save(new Book(1L,"Book1","hasan","hello book 1",10,10,"RF","img1"));
            bookRepository.save(new Book(2L,"Book2","hasan1","hello book 2",2,2,"RF","img2"));
            bookRepository.save(new Book(3L,"Book1","hasan2","hello book 3",20,20,"RF","img3"));
        };
    }*/

}
