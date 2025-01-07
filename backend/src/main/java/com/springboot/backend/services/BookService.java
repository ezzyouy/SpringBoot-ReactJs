package com.springboot.backend.services;

import com.springboot.backend.entities.Book;
import com.springboot.backend.entities.Checkout;
import com.springboot.backend.responsemodels.ShelfCurrentLoansResponse;
import com.springboot.backend.respositories.BookRepository;
import com.springboot.backend.respositories.CheckoutRepository;
//import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;


    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (book.isEmpty() || validateCheckout != null || book.get().getCopies_available() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }
        book.get().setCopies_available(book.get().getCopies_available() - 1);

        bookRepository.save(book.get());

        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(), book.get().getId());
        checkoutRepository.save(checkout);

        return book.get();
    }

    public boolean checkoutBookByUser(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

    public int currentLoansCount(String userEmail) throws Exception {
        return checkoutRepository.findUsersByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();
        List<Checkout> checkouts = checkoutRepository.findUsersByUserEmail(userEmail);

        List<Long> bookIdList = new ArrayList<>();

        for (Checkout checkout : checkouts) {
            bookIdList.add(checkout.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {
            Optional<Checkout> checkout = checkouts.stream()
                    .filter(x -> x.getBookId() == book.getId()).findFirst();
            if (checkout.isPresent()) {
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) difference_In_Time));
            }
        }
        return shelfCurrentLoansResponses;

    }

    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (book.isEmpty() || validateCheckout == null) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }
        book.get().setCopies_available(book.get().getCopies_available() + 1);
        bookRepository.save(book.get());
        checkoutRepository.deleteById(validateCheckout.getId());
    }

    public void renewLoan(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout  = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout == null) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if(d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0){
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString() );
            checkoutRepository.save(validateCheckout);
        }

    }
}
