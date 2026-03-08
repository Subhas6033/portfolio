import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";
import {Loader} from "./Components/index"
import RouteTitleUpdater from "./Components/RouteTitleUpdater";

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <>
        <RouteTitleUpdater />
          <Layout>
            <Outlet />
          </Layout>
    </>
  );
};

export default App;
