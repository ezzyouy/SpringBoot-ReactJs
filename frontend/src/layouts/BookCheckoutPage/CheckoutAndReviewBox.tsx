import React from "react";
import BookModel from "../../models/BookModel";
import { Link } from "react-router-dom";
import { LeaveReview } from "../Utils/LeaveReview.tsx";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoansCount: number;
  isAuthenticated: any;
  isCheckedOut: Boolean;
  checkoutBook: any;
  isReviewLeft: boolean;
  submitReview:any
}> = (props) => {
  function buttonRender() {
    if (props.isAuthenticated) {
      if (!props.isCheckedOut && props.currentLoansCount < 5) {
        return (
          <button
            onClick={() => props.checkoutBook()}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Book checked out. Enjoy </b>
          </p>
        );
      } else if (!props.isCheckedOut) {
        return <p className="text-danger">Too many books checked out</p>;
      }
    }
    return (
      <Link to={"/login"} className="btn btn-success btn-lg">
        Sign in
      </Link>
    );
  }

  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewLeft) {
      return (
        <p>
          <LeaveReview submitReview={props.submitReview} />
        </p>
      );
    } else if (props.isAuthenticated && props.isReviewLeft) {
      return (
        <p>
          <b>Thank your for your review</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Sign in to be able to leave a review</p>
      </div>
    );
  }
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 conatiner d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.currentLoansCount}/5 </b>
            books checked out
          </p>
          <hr />
          {props.book &&
          props.book.copies_available &&
          props.book.copies_available > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copies_available} </b>
              available
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
          Thiss number can change until placing order has been complete.
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
