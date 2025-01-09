import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar.tsx";
import { Footer } from "./layouts/NavbarAndFooter/Footer.tsx";
import { HomePage } from "./layouts/HomePage/HomePage.tsx";
import { SearchBookPage } from "./layouts/SearchBookPage/SearchBookPage.tsx";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage.tsx";
import { oktaConfig } from "./lib/oktaConfig.ts";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget.jsx";
import { ReviewListPage } from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage.tsx";
import { ShelfPage } from "./layouts/ShelfPage/ShelfPage.tsx";
import { MessagesPage } from "./layouts/MessagesPage/MessagesPage.tsx";

const oktaAuth = new OktaAuth(oktaConfig);
export const App = () => {
  const history = useHistory();

  const customAthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBookPage />
            </Route>
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/shelf">
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path="/messages">
              <MessagesPage />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
