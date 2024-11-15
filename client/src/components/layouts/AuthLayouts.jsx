import React from "react";
import Header from "./header";
import Breadcumb from "./breadcumb";
import Login from "../auth/login";
import Register from "../auth/register";
import { Outlet } from "react-router-dom";

const AuthLayouts = () => {
  return (
    <div>
      <Header />
      <Breadcumb />
      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <div className="row">
                    <Outlet />
                  </div>
                </div>
              </div>
              {/*=======  End of page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
