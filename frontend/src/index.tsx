import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OdvudGWm9WLOIacm7C7Pe7EBb4NPHUeVjwF0SaAsp9Pzlh3hvCzidqQHaMWGNW48sJE4RVTPR88li9i0lUQd90b00tS5aRVyh"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Elements>
  </BrowserRouter>
);
