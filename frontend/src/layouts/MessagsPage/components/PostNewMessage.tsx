import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import MessageModel from "../../../models/MessageModel.ts";

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySeccess, setDisplaySeccess] = useState(false);

  async function submitNewQuestion() {
    const url = `${process.env.REACT_APP_API}/messages/secure/add/message`;
    if (authState?.isAuthenticated && title !== "" && question !== "") {
      const messageRequestModel: MessageModel = new MessageModel(
        title,
        question
      );
      const requestOption = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageRequestModel),
      };

      const submitNewQuestionResponse = await fetch(url, requestOption);
      if (!submitNewQuestionResponse.ok) {
        throw new Error("Something went wrong");
      }

      setTitle("");
      setQuestion("");
      setDisplayWarning(false);
      setDisplaySeccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySeccess(false);
    }
  }
  return (
    <div className="card mt-3">
      <div className="card-header">Ask question to luv 2 Read Admin</div>
      <div className="card-body">
        <form method="POST">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All fields must be filled out
            </div>
          )}
          {displaySeccess && (
            <div className="alert alert-success" role="alert">
              Question added successfully
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Question
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={submitNewQuestion}
            >
              Submit question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
