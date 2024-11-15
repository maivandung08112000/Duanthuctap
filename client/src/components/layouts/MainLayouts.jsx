import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";

const MainLayouts = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default MainLayouts;
