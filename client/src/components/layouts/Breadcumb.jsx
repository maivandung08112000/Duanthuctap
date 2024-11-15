import React from "react";

const Breadcumb = (props) => {
  const { parentTitle, title, link } = props;
  return (
    <div className="breadcrumb-area section-space--half">
      <div className="container wide">
        <div className="row">
          <div className="col-lg-12">
            {/*=======  breadcrumb wrpapper  =======*/}
            <div className="breadcrumb-wrapper breadcrumb-bg">
              {/*=======  breadcrumb content  =======*/}
              <div className="breadcrumb-content">
                <h2 className="breadcrumb-content__title">{title}</h2>
                <ul className="breadcrumb-content__page-map">
                  <li>
                    <a href="#">{parentTitle}</a>
                  </li>
                  <li className="active">{title}</li>
                </ul>
              </div>
              {/*=======  End of breadcrumb content  =======*/}
            </div>
            {/*=======  End of breadcrumb wrpapper  =======*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcumb;
