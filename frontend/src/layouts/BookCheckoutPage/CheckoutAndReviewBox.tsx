import React from "react";
import BookModel from "../../models/BookModel";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
}> = (props) => {
  const { authState } = useOktaAuth();
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 conatiner d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>0/5 </b>
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
        {!authState?.isAuthenticated ? (
          <Link className="btn main-color btn-lg text-white" to="/login">
            Sign in
          </Link>
        ) : (
          <Link to="/checkout" className="btn btn-success btn-lg">
            checkout
          </Link>
        )}

        <hr />
        <p className="mt-3">
          Thiss number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review</p>
      </div>
    </div>
  );
};
