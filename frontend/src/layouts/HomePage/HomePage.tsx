import React from "react";
import { ExploreTopBooks } from "./components/ExploreTopBooks.tsx";
import { Carousel } from "./components/Carousel.tsx";
import { Heros } from "./components/Heros.tsx"
import { LibraryServices } from "./components/LibraryServices.tsx";



export const HomePage = () => {
  return (
    <div>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </div>
  );
};
