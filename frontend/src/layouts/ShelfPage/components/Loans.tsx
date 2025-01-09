import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans.ts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading.tsx";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal.tsx";

export const Loans = () => {
  const { authState } = useOktaAuth();

  console.log(authState);
  

  const [httpError, setHttpError] = useState(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans`;
        const requestOption = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOption);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error("Something went wrong!");
        }

        const shelfCurrentLoansResponseJson =
          await shelfCurrentLoansResponse.json();

        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    };
    fetchUserCurrentLoans().catch((err) => {
      setIsLoadingUserLoans(false);
      setHttpError(err.message);
    });
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url = `http://localhost:8080/api/books/secure/return?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const returnResponse = await fetch(url, requestOption);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setCheckout(!checkout);
  }

  async function renewLoan(bookId: number) {
    const url = `http://localhost:8080/api/books/secure/renew/loan?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const renewLoanResponse = await fetch(url, requestOption);
    if (!renewLoanResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setCheckout(!checkout);
  }
  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current loans:</h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book.img}
                        width="226"
                        height={"349"}
                        alt="book"
                      />
                    ) : (
                      <img
                        src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                        width="226"
                        height={"349"}
                        alt="book"
                      />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft === 0 && (
                          <p className="text-success">Due Today.</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item list-group-item-action"
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        help other find their adventure by reviewing your loan.
                      </p>
                      <Link
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                        className="btn btn-primary"
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={false}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">currently no loans</h3>
            <Link to={"search"} className="btn btn-primary">
              Search for a new book?
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current loans:</h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {shelfCurrentLoan.book?.img ? (
                    <img
                      src={shelfCurrentLoan.book.img}
                      width="226"
                      height={"349"}
                      alt="book"
                    />
                  ) : (
                    <img
                      src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                      width="226"
                      height={"349"}
                      alt="book"
                    />
                  )}
                </div>
                <div className="card  d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Loan Options</h4>
                      {shelfCurrentLoan.daysLeft > 0 && (
                        <p className="text-secondary">
                          Due in {shelfCurrentLoan.daysLeft} days.
                        </p>
                      )}
                      {shelfCurrentLoan.daysLeft === 0 && (
                        <p className="text-success">Due Today.</p>
                      )}
                      {shelfCurrentLoan.daysLeft < 0 && (
                        <p className="text-danger">
                          Past due by {shelfCurrentLoan.daysLeft} days.
                        </p>
                      )}
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                        >
                          Manage Loan
                        </button>
                        <Link
                          to="search"
                          className="list-group-item list-group-item-action"
                        >
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">
                      help other find their adventure by reviewing your loan.
                    </p>
                    <Link
                      to={`/checkout/${shelfCurrentLoan.book.id}`}
                      className="btn btn-primary"
                    >
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={true}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">currently no loans</h3>
            <Link to="search" className="btn btn-primary">
              Search for a new book?
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
