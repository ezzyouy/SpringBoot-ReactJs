import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel.ts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading.tsx";
import { Pagination } from "../../Utils/Pagination.tsx";
import { AdminMessage } from "./AdminMessage.tsx";
import AdminMessageRequest from '../../../models/AdminMessageRequest.ts'

export const AdminMessages = () => {
  const { authState } = useOktaAuth();

  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const [messagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/messageses/search/findByClosed?closed=false&page=${
          currentPage - 1
        }&size=${messagesPerPage}`;

        const requestOption = {
          method: "GET",
          headers: {
            Authorisation: `Bearer ${authState.accessToken?.accessToken}`,
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
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((err) => {
      setIsLoadingMessages(false);
      setHttpError(err.message);
    });
  }, [authState, currentPage, btnSubmit, messagesPerPage]);

  if (isLoadingMessages) {
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

  async function submitResponseToQuestion(id: number, response: string) {
    const url = `http://localhost:8080/api/messages/secure/admin/message`;
    if (
      authState &&
      authState.isAuthenticated &&
      id !== null &&
      response !== ""
    ) {
      const messageadminRequestModel: AdminMessageRequest =
        new AdminMessageRequest(id, response);
      const requestOption = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageadminRequestModel),
      };
      const messageadminRequestModelResponse = await fetch(url, requestOption);
      console.log("requestOption ", requestOption);
      
      if (!messageadminRequestModelResponse.ok) {
        throw new Error("something went wrong!");
      }
      setBtnSubmit(!btnSubmit);
    }
  }
  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A: </h5>
          {messages.map((message) => (
            <AdminMessage
              message={message}
              key={message.id}
              submitResponseToQuestion={submitResponseToQuestion}
            />
          ))}
        </>
      ) : (
        <h5>No Pending Q/A</h5>
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
