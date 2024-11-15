import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import { Tabs } from "antd";

//
import products_3 from "@/assets/img/products/3-600x800.webp";
import products_3_1 from "@/assets/img/products/3_1-600x800.webp";
import { useSelector } from "react-redux";
import axios from "axios";

const OurProductsNew = () => {
  const categories = useSelector((state) => state.category.listCategory);

  const sliderSettings = {
    slidesToShow: 4, // Hiển thị 4 slide cùng lúc
    slidesToScroll: 1, // Di chuyển 1 slide mỗi lần cuộn
    arrows: true, // Hiển thị mũi tên điều hướng
    autoplay: false, // Không tự động chạy slide
    autoplaySpeed: 5000, // Nếu autoplay: true, thời gian chờ giữa các lần cuộn là 5000ms
    speed: 1000, // Tốc độ chuyển slide (1 giây)
    infinite: false, // Không cuộn vô tận
    prevArrow: (
      <button className="slick-prev">
        {" "}
        <i className="ion-chevron-left" />{" "}
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        {" "}
        <i className="ion-chevron-right" />{" "}
      </button>
    ),
    responsive: [
      { breakpoint: 1501, settings: { slidesToShow: 4 } }, // Trên 1501px: 4 slide
      { breakpoint: 1199, settings: { slidesToShow: 4, arrows: false } }, // Trên 1199px: 4 slide, không có mũi tên
      { breakpoint: 991, settings: { slidesToShow: 3, arrows: false } }, // Trên 991px: 3 slide
      { breakpoint: 767, settings: { slidesToShow: 2, arrows: false } }, // Trên 767px: 2 slide
      { breakpoint: 575, settings: { slidesToShow: 2, arrows: false } }, // Trên 575px: 2 slide
      { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } }, // Dưới 479px: 1 slide
    ],
  };

  const [activeTab, setActiveTab] = useState(categories[0]?._id);
  const [productByCategoryID, setProductByCategoryID] = useState([]);

  // Hàm xử lý khi một tab được click
  const handleTabClick = (id) => {
    setActiveTab(id); // Cập nhật state với ID của tab được click
  };

  useEffect(() => {
    if (activeTab) {
      getProductsByCategory(activeTab);
    }
  }, [activeTab])

  // api lấy sản phẩm theo danh mục
  const getProductsByCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5555/api/product-category/${activeTab ?? id}`);

      if (res && res.status === 200) {
        setProductByCategoryID(res.data);
      }
    } catch (error) {}
  };

  return (
    <div className="tab-slider-wrapper">
      {/*=======  tab product navigation  =======*/}
      <div className="tab-product-navigation">
        <div className="nav nav-tabs justify-content-center" id="nav-tab2" role="tablist">
          {categories.map((category) => (
            <a
              key={category._id} // Đặt key duy nhất cho mỗi tab
              className={`nav-item nav-link ${activeTab === category._id ? "active" : ""}`} // Thêm class active nếu tab đang được chọn
              id={`product-tab-${category._id}`}
              onClick={() => handleTabClick(category._id)} // Gọi hàm khi tab được click
              role="tab"
              aria-selected={activeTab === category._id}
              // href={`#product-series-${category._id}`}
              >
              {category.name}
            </a>
          ))}
        </div>
      </div>
      {/*=======  End of tab product navigation  =======*/}
      {/*=======  tab product content  =======*/}
      <div className="tab-content">
        {categories?.map((category, index) => (
          <div
            key={category._id} // Thêm key duy nhất cho mỗi tab-pane
            className={`tab-pane fade ${index === 0 ? "show active" : ""}`} // Tab đầu tiên sẽ có class active
            id={`product-series-${category._id}`} // Sử dụng ID của category
            role="tabpanel"
            aria-labelledby={`product-tab-${category._id}`}>
            {/*=======  single row slider wrapper  =======*/}
            <div className="single-row-slider-wrapper slider-gap--30">
              <Slider {...sliderSettings}>
                {productByCategoryID.map(
                  (
                    product // Giả định mỗi category có một danh sách sản phẩm
                  ) => (
                    <div className="col" key={product.id}>
                      {/* Single product */}
                      <div className="single-grid-product">
                        <div className="single-grid-product__image">
                          <a href="javascript:void(0)">
                            <img width={600} height={800} src={product.image} className="img-fluid" alt="" />
                            <img width={600} height={800} src={product.image2} className="img-fluid" alt="" />
                          </a>
                          <div className="hover-icons">
                            <a href="javascript:void(0)">
                              <i className="ion-bag" />
                            </a>
                            <a href="javascript:void(0)">
                              <i className="ion-heart" />
                            </a>
                            <a href="javascript:void(0)">
                              <i className="ion-android-options" />
                            </a>
                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#quick-view-modal-container">
                              <i className="ion-android-open" />
                            </a>
                          </div>
                        </div>
                        <div className="single-grid-product__content">
                          <div className="single-grid-product__category-rating">
                            <span className="category">
                              <a href="javascript:void(0)">{category.name}</a>
                            </span>
                            <span className="rating">
                              {/* Giả định có rating cho sản phẩm */}
                              {Array.from({ length: product.rating }, (_, i) => (
                                <i key={i} className="ion-android-star active" />
                              ))}
                              {Array.from({ length: 5 - product.rating }, (_, i) => (
                                <i key={i} className="ion-android-star-outline" />
                              ))}
                            </span>
                          </div>
                          <h3 className="single-grid-product__title">
                            <a href="javascript:void(0)">{product.title}</a>
                          </h3>
                          <p className="single-grid-product__price">
                            <span className="main-price">${product.price}</span>
                          </p>
                        </div>
                      </div>
                      {/* End of single product */}
                    </div>
                  )
                )}
              </Slider>
            </div>
            {/*=======  End of single row slider wrapper  =======*/}
          </div>
        ))}
      </div>

      {/*=======  End of tab product content  =======*/}
    </div>
  );
};

export default OurProductsNew;
