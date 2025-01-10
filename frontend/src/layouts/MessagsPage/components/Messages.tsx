import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel.ts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading.tsx";
import { Pagination } from "../../Utils/Pagination.tsx";

export const Messages = () => {
  const { authState } = useOktaAuth();

  const [isloadingMessages, setIsloadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [messages, setMessages] = useState<MessageModel[]>([]);

  const [messagePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/messageses/search/findByUserEmail?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=${messagePerPage}`;
        const requestOption = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const messagesResponse = await fetch(url, requestOption);

        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }

        const messagesResponseJson = await messagesResponse.json();

        setMessages(messagesResponseJson._embedded.messageses);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsloadingMessages(false);
    };
    fetchUserMessages().catch((err) => {
      setIsloadingMessages(false);
      setHttpError(err.message);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage]);

  if (isloadingMessages) {
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
      {messages.length > 0 ? (
        <>
          <h5>Current Q/A</h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>
                  Case #{message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <h5>Response: </h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6>{message.adminEmail}</h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>
                        pending response from administration. Please be
                        partient.
                      </i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h5>All question you submit will be shown here</h5>
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
