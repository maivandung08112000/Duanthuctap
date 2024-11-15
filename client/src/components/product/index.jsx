import React, { useEffect, useState } from "react";
import Breadcumb from "../layouts/breadcumb";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const category = useSelector((state) => state.category.listCategory);
  const [data, setData] = useState([]);
  const [dataSorted, setDataSorted] = useState([]);

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetList();
  }, []);

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/product`);
      if (response.status === 200) {
        setData(response.data);
        setDataSorted(response.data); // Set sorted data to all initially
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // hàm sử dụng thay đổi sort
  const handleChangeSort = (e) => {
    const selectedCategory = e.target.value;

    // Nếu "ALL" được chọn, hiển thị toàn bộ sản phẩm
    if (selectedCategory === "ALL") {
      setDataSorted(data);
    } else {
      setDataSorted(data.filter((item) => item.category_id === selectedCategory));
    }
  };

  return (
    <div>
      <Breadcumb parentTitle={"Sản phẩm"} title={"Giầy Thể Thao"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  shop page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <div className="row">
                    <div className="col-lg-12">
                      {/*=======  shop page header  =======*/}
                      <div className="shop-header">
                        <div className="shop-header__left">
                          <div className="grid-icons">
                            <button
                              data-target="grid five-column"
                              data-tippy={5}
                              data-tippy-inertia="true"
                              data-tippy-animation="fade"
                              data-tippy-delay={50}
                              data-tippy-arrow="true"
                              data-tippy-theme="roundborder"
                              className="five-column active d-lg-block"
                            />
                          </div>
                          <div className="shop-header__left__message">
                            Đang xem {dataSorted.length} of {data.length}
                          </div>
                        </div>
                        <div className="shop-header__right">
                          <div className="single-select-block d-inline-block">
                            <span className="select-title">Hiển thị:</span>
                            <select>
                              <option value={1}>10</option>
                              <option value={2}>20</option>
                              <option value={3}>30</option>
                              <option value={4}>40</option>
                            </select>
                          </div>
                          <div className="single-select-block d-inline-block">
                            <span className="select-title">Lọc theo danh sách:</span>
                            <select className="pr-0" onChange={handleChangeSort}>
                              <option value={"ALL"}>TẤT CẢ</option>
                              {category.map((x) => (
                                <option key={x?._id} value={x?._id}>
                                  {x?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/*=======  End of shop page header  =======*/}
                    </div>
                    <div className="col-lg-12">
                      {/*=======  shop page content  =======*/}
                      <div className="shop-page-content">
                        <div className="row shop-product-wrap grid five-column">
                          {dataSorted.map((item) => (
                            <div key={item?._id} className="col-12 col-md-4 col-sm-6 col-lg-is-5">
                              {/*=======  product grid view  =======*/}
                              <div className="single-grid-product grid-view-product">
                                <div className="single-grid-product__image">
                                  <div className="single-grid-product__label">
                                    <span className="sale">-20%</span>
                                    <span className="new">New</span>
                                  </div>
                                  <Link to={`/product/${item?._id}`}>
                                    <img
                                      width={600}
                                      height={800}
                                      src={`http://localhost:5555${item?.image[0]?.img_url}`}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </Link>
                                  <div className="hover-icons">
                                    <a href="javascript:void(0)">
                                      <i className="ion-bag" />
                                    </a>
                                    <a href="javascript:void(0)">
                                      <i className="ion-heart" />
                                    </a>
                                  </div>
                                </div>
                                <div className="single-grid-product__content">
                                  <div className="single-grid-product__category-rating">
                                    <span className="category">
                                      <a>{category?.find((x) => x._id === item?.category_id)?.name}</a>
                                    </span>
                                    <span className="rating">
                                      <i className="ion-android-star active" />
                                      <i className="ion-android-star active" />
                                      <i className="ion-android-star active" />
                                      <i className="ion-android-star active" />
                                      <i className="ion-android-star-outline" />
                                    </span>
                                  </div>
                                  <h3 className="single-grid-product__title">
                                    <a href="javascript:void(0)">{item?.name}</a>
                                  </h3>
                                  <p className="single-grid-product__price">
                                    <span className="discounted-price">{item?.variants[0]?.price}</span>{" "}
                                    <span className="main-price discounted">$120.00</span>
                                  </p>
                                </div>
                              </div>
                              {/*=======  End of product grid view  =======*/}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/*=======  pagination area =======*/}
                    </div>
                  </div>
                </div>
              </div>
              {/*=======  End of shop page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
