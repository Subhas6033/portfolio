import React, { useEffect, useState } from "react";
import { Header, Footer, Loader } from "./Components/index";
import { Outlet } from "react-router-dom";

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6500)

    return () => clearTimeout(timer)
  }, [])

  return isLoading ? <Loader /> : (
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
