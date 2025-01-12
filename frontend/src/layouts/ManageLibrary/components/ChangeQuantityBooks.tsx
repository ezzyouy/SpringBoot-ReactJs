import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel.ts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading.tsx";
import { Pagination } from "../../Utils/Pagination.tsx";
import { ChangeQuantityBook } from "./ChangeQuantityBook.tsx";

export const ChangeQuantityBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPage, settTotalPage] = useState(0);
  const [bookDelete, setBookDelete] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API}/books?page=${
        currentPage - 1
      }&size=${booksPerPage}`;

      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      settTotalPage(responseJson.page.totalPages);

      const loadedBooks: BookModel[] = [];
      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copies_available: responseData[key].copies_available,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [booksPerPage, currentPage, bookDelete]);

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirsBook: number = indexOfLastBook - booksPerPage;
  let lastItems =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteBook = () => setBookDelete(!bookDelete);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container m-5">
      {totalAmountOfBooks > 0 ? (
        <>
          <div className="mt-3">
            <h3>Number of results: ({totalAmountOfBooks})</h3>
          </div>
          <p>
            {indexOfFirsBook + 1} to {lastItems} of {totalAmountOfBooks} items:
          </p>
          {books.map((book) => (
            <ChangeQuantityBook book={book} key={book.id} deleteBook={deleteBook}/>
          ))}
        </>
      ) : (
        <h5>Add a book before changing quantity</h5>
      )}
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};
