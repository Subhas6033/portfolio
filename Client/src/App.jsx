import React from "react";
import { Header, Footer } from "./Components/index";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main>
        {/* TO Render the childrens of the page */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
