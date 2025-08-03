import React, { useEffect, useState } from "react";
import { Header, Footer, Loader } from "./Components/index";
import { Outlet } from "react-router-dom";

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      {/* TODO: NO SCROLLBAR VISIBLE IN THE PAGE */}
      <main className="bg-gradient-to-r from-[#7696CF] to-[#1b2549] scrollbar-none">
        {/* TO Render the childrens of the page */}
          <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
