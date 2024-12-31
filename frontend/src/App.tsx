import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar.tsx";
import { Footer } from "./layouts/NavbarAndFooter/Footer.tsx";
import { HomePage } from "./layouts/HomePage/HomePage.tsx";
import { SearchBookPage } from "./layouts/SearchBookPage/SearchBookPage.tsx";
import { Route, Switch, Redirect } from "react-router-dom";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
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
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
