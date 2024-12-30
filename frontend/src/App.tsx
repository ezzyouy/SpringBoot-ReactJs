import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar.tsx";
import { Footer } from "./layouts/NavbarAndFooter/Footer.tsx";
import { HomePage } from "./layouts/HomePage/HomePage.tsx";
import { SearchBookPage } from "./layouts/SearchBookPage/SearchBookPage.tsx";


export const App = () => {
  return (
    <>
    <Navbar />
    {/* <HomePage /> */}
    <SearchBookPage/> 
    <Footer />
  </>
  )
}

