import React from "react";

import logo from "@/assets/img/logo.webp";

const Footer = () => {
  return (
    <div className="footer-area">
      <div className="footer-copyright">
        <div className="container wide">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-copyright-wrapper footer-copyright-wrapper--default-footer">
                <div className="container">
                  <div className="row align-items-center no-gutters">
                    <div className="col-lg-2 col-md-2">
                      <div className="footer-logo">
                        <a href="#">
                          <img width={93} height={25} src={logo} className="img-fluid" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-5">
                      <div className="copyright-text">
                        Copyright © 2022 <a href="#">Eposi</a>. All Rights Reserved.
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-5">
                      <div className="copyright-social-wrapper">
                        <ul className="copyright-social">
                          <li>
                            <a href="#">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-google-plus" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-youtube" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
