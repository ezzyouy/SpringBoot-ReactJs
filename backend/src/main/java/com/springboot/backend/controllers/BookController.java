package com.springboot.backend.controllers;

import com.springboot.backend.entities.Book;
import com.springboot.backend.entities.Checkout;
import com.springboot.backend.services.BookService;
import com.springboot.backend.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = "example1user@email.com";
        return bookService.currentLoansCount(userEmail);
    }
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkedoutBookByUser(@RequestHeader(value = "Authorization") String token,
                                        @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkout(@RequestHeader(value = "Authorization") String token
                         ,@RequestParam Long bookId) throws Exception {
        String userEmail = "example1user@email.com";
        return bookService.checkoutBook(userEmail, bookId);
    }


}
