import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import axios from "axios";

const OurProducts = () => {
  const categories = useSelector((state) => state.category.listCategory);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 1000,
    infinite: false,
    prevArrow: (
      <button className="slick-prev">
        <i className="ion-chevron-left" />
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <i className="ion-chevron-right" />
      </button>
    ),
    responsive: [
      { breakpoint: 1501, settings: { slidesToShow: 4 } },
      { breakpoint: 1199, settings: { slidesToShow: 4, arrows: false } },
      { breakpoint: 991, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 767, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 575, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  const [activeTab, setActiveTab] = useState(null); // Start with null
  const [productByCategoryID, setProductByCategoryID] = useState([]);

  // Set the initial activeTab when categories are available
  useEffect(() => {
    if (categories.length > 0) {
      setActiveTab(categories[0]._id); // Set to the first category ID
    }
  }, [categories]);

  // Handle tab click
  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  useEffect(() => {
    if (activeTab) {
      getProductsByCategory(activeTab);
    }
  }, [activeTab]);

  // API call to get products by category
  const getProductsByCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5555/api/product-category/${id}`);

      if (res && res.status === 200) {
        setProductByCategoryID(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="tab-slider-wrapper">
      {/* Tab navigation */}
      <div className="tab-product-navigation">
        <div className="nav nav-tabs justify-content-center" id="nav-tab2" role="tablist">
          {categories.map((category) => (
            <a
              key={category._id}
              className={`nav-item nav-link ${activeTab === category._id ? "active" : ""}`}
              id={`product-tab-${category._id}`}
              onClick={() => handleTabClick(category._id)}
              role="tab"
              aria-selected={activeTab === category._id}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`tab-pane fade ${activeTab === category._id ? "show active" : ""}`}
            id={`product-series-${category._id}`}
            role="tabpanel"
            aria-labelledby={`product-tab-${category._id}`}
          >
            <div className="single-row-slider-wrapper slider-gap--30">
              <Slider {...sliderSettings}>
                {productByCategoryID.map((product) => (
                  <div className="col" key={product._id}>
                    <div className="single-grid-product">
                      <div className="single-grid-product__image">
                        <a href="javascript:void(0)">
                          <img width={600} height={800} src={`http://localhost:5555${product?.image[0]?.img_url}`} className="img-fluid" alt="" />
                          <img width={600} height={800} src={`http://localhost:5555${product?.image[1]?.img_url}`} className="img-fluid" alt="" />
                        </a>
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
                            <a href="javascript:void(0)">{category.name}</a>
                          </span>
                          <span className="rating">
                            {Array.from({ length: product.rating }, (_, i) => (
                              <i key={i} className="ion-android-star active" />
                            ))}
                            {Array.from({ length: 5 - product.rating }, (_, i) => (
                              <i key={i} className="ion-android-star-outline" />
                            ))}
                          </span>
                        </div>
                        <h3 className="single-grid-product__title">
                          <a href="javascript:void(0)">{product.name}</a>
                        </h3>
                        <p className="single-grid-product__price">
                          <span className="main-price">${product.variants[0]?.price}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
