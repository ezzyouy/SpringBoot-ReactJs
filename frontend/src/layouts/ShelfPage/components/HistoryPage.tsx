import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel.ts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading.tsx";
import { Link } from "react-router-dom";
import { Pagination } from "../../Utils/Pagination.tsx";

export const HistoryPage = () => {
  const { authState } = useOktaAuth();

  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [histories, setHistories] = useState<HistoryModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserHstory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/histories/search/findByUserEmail?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=5`;
        const requestOption = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const histotyResponse = await fetch(url, requestOption);
        console.log("histotyResponse ",histotyResponse);
        
        if (!histotyResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const histotyResponseJson = await histotyResponse.json();
        setHistories(histotyResponseJson._embedded.histories);
        setTotalPages(histotyResponseJson.page.totalPages);
      }
      setIsLoadingHistory(false);
    };
    fetchUserHstory().catch((err) => {
      setIsLoadingHistory(false);
      setHttpError(err.message);
    });
  }, [authState, currentPage]);

  if (isLoadingHistory) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {histories.length > 0 ? (
        <>
          <h5>Recent History:</h5>
          {histories.map((history) => (
            <div key={history.id}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      {history.img ? (
                        <img
                          src={history.img}
                          width="123"
                          height="196"
                          alt="book"
                        />
                      ) : (
                        <img
                          src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                          width="123"
                          height="196"
                          alt="book"
                        />
                      )}
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      {history.img ? (
                        <img
                          src={history.img}
                          width="123"
                          height="196"
                          alt="book"
                        />
                      ) : (
                        <img
                          src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                          width="123"
                          height="196"
                          alt="book"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">{history.author}</h5>
                      <h4>{history.title}</h4>
                      <p className="card-text">{history.description}</p>
                      <hr />
                      <p className="card-text">
                        checked out on: {history.checkoutDate}
                      </p>
                      <p className="card-text">
                        Returned on: {history.returnedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mt-3">curremtly no history: </h3>
          <Link className="btn btn-primary" to={"search"}>
            Search for new book
          </Link>
        </>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
