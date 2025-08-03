import React, { useEffect, useState } from "react";
import { Header, Footer, Loader } from "./Components/index";
import { Outlet } from "react-router-dom";

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <main className="bg-gradient-to-r from-[#7696CF] to-[#1b2549] scrollbar-none">
        {/* TO Render the childrens of the page */}
          <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
