package com.springboot.backend.controllers;

import com.springboot.backend.requestModels.AddBookRequest;
import com.springboot.backend.services.AdminService;
import com.springboot.backend.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("https://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void addBook(@RequestHeader("Authorization") String token, @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration type only");
        }
        adminService.postBook(addBookRequest);
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader("Authorization") String token, @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration type only");
        }
        adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader("Authorization") String token, @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration type only");
        }
        adminService.decreaseBookQuantity(bookId);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader("Authorization") String token, @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration type only");
        }
        adminService.deleteBook(bookId);
    }
}
