import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel";
import $ from "jquery";

//
import category_1 from "@/assets/img/category/img1-top-eposi1.webp";
import category_2 from "@/assets/img/category/img2-top-eposi1.webp";
import category_3 from "@/assets/img/category/img3-top-eposi1.webp";
import category_4 from "@/assets/img/category/img4-top-eposi1.webp";
//
import banners_1 from "@/assets/img/banners/img1-middle-eposi1.webp";
import banners_2 from "@/assets/img/banners/img2-middle-eposi1.webp";

//
import testimonial_1 from "@/assets/img/testimonial/testimor1-72x72.webp";
import testimonial_2 from "@/assets/img/testimonial/testimor2-72x72.webp";
import testimonial_3 from "@/assets/img/testimonial/testimor3-72x72.webp";
import icon_testimonials from "@/assets/img/icons/icon_testimonials.webp";

//
import free_shipping from "@/assets/img/icons/free_shipping.webp";
import money_back from "@/assets/img/icons/money_back.webp";
import support247 from "@/assets/img/icons/support247.webp";

//

import OurProducts from "./OurProducts";
import { useSelector } from "react-redux";

const Home = () => {
  const categories = useSelector((state) => state.category.listCategory);

  const settings = {
    dots: true, // Hiển thị dots
    infinite: true, // Slide quay vòng
    speed: 1000, // Tốc độ chuyển slide
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true, // Hiệu ứng chuyển mượt mà
    arrows: true, // Hiển thị nút mũi tên
    prevArrow: (
      <button class="slick-next slick-arrow" style="">
        <i class="ion-chevron-right"></i>
      </button>
    ), // Nút mũi tên trái
    nextArrow: (
      <button class="slick-prev slick-arrow" style="">
        <i class="ion-chevron-left"></i>
      </button>
    ), // Nút mũi tên phải
  };

  // tạo slick kiểu khác
  useEffect(() => {
    setTimeout(() => {
      // Khởi tạo Slider 1
      $(".ht-slick-slider.slider-1").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 1000,
        infinite: true,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev'><i class='ion-ios-arrow-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='ion-ios-arrow-right'></i></button>",
        responsive: [
          { breakpoint: 1501, settings: { slidesToShow: 1 } },
          { breakpoint: 1199, settings: { slidesToShow: 1, arrows: false } },
          { breakpoint: 991, settings: { slidesToShow: 1, arrows: false } },
          { breakpoint: 767, settings: { slidesToShow: 1, arrows: false } },
          { breakpoint: 575, settings: { slidesToShow: 1, arrows: false } },
          { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } },
        ],
      });

      // Khởi tạo Slider 2
      $(".ht-slick-slider.slider-2").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 1000,
        infinite: true,
        responsive: [
          { breakpoint: 1501, settings: { slidesToShow: 3 } },
          { breakpoint: 1199, settings: { slidesToShow: 3 } },
          { breakpoint: 991, settings: { slidesToShow: 2 } },
          { breakpoint: 767, settings: { slidesToShow: 1 } },
          { breakpoint: 575, settings: { slidesToShow: 1 } },
          { breakpoint: 479, settings: { slidesToShow: 1 } },
        ],
      });
    }, 0);
  }, []);

  return (
    <div>
      <div className="hero-slider-area section-space">
        <div className="container wide">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-slider-wrapper">
                <Slider {...settings}>
                  {/* Slide 1 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-1">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">AMAZING PRODUCT!</p>
                              <p className="slider-title slider-title--big-bold">SNEAKERS</p>
                              <p className="slider-title slider-title--small">
                                High Quality Sports Shoes
                              </p>
                              <a className="hero-slider-button" href="javascript:void(0)">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-2">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">AMAZING PRODUCT!</p>
                              <p className="slider-title slider-title--big-bold">SNEAKERS</p>
                              <p className="slider-title slider-title--small">High Quality Sports Shoes</p>
                              <a className="hero-slider-button" href="javascript:void(0)">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-3">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">AMAZING PRODUCT!</p>
                              <p className="slider-title slider-title--big-bold">SNEAKERS</p>
                              <p className="slider-title slider-title--small">
                              High Quality Sports Shoes
                              </p>
                              <a className="theme-button hero-slider-button" href="javascript:void(0)">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  category wrapper  =======*/}
              <div className="category-wrapper">
                <div className="row row-10 masonry-category-layout">
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="javascript:void(0)">
                          <img width={375} height={550} src={category_1} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">SHOES</h3>
                        <a href="javascript:void(0)">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="javascript:void(0)">
                          <img width={380} height={265} src={category_2} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">SHOES</h3>
                        <a href="javascript:void(0)">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="javascript:void(0)">
                          <img src={category_3} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">SHOES</h3>
                        <a href="javascript:void(0)">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="javascript:void(0)">
                          <img width={380} height={265} src={category_4} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">SHOES</h3>
                        <a href="javascript:void(0)">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of category wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="single-row-slider-tab-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  section title  =======*/}
              <div className="section-title-wrapper text-center section-space--half">
                <h2 className="section-title">Sản phẩm của tôi</h2>
                <p className="section-subtitle">
                High quality reputation and deep in the field of sports shoe fashion.
                </p>
              </div>
              {/*=======  End of section title  =======*/}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/*=======  tab slider wrapper  =======*/}
              <div className="tab-slider-wrapper">
                <div className="tab-product-navigation">
                  <OurProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-area section-space">
        <div className="container wide">
          <div className="row">
            <div className="col-lg-12">
              <div className="full-testimonial-wrapper testimonial-bg">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="testimonial-wrapper section-space--inner">
                        <div className="ht-slick-slider slider-1">
                          {/*=======  single testimonial item  =======*/}
                          {[
                            {
                              image: testimonial_1,
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                            {
                              image: testimonial_2,
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                            {
                              image: testimonial_3,
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                          ].map((testimonial, index) => (
                            <div className="single-testimonial-item row" key={index}>
                              <div className="col-lg-8 mx-auto">
                                <div className="single-testimonial-item__image">
                                  <img width={72} height={72} src={testimonial.image} className="img-fluid" alt="" />
                                </div>
                                <div className="single-testimonial-item__content">
                                  <p className="testimonial-text">{testimonial.text}</p>
                                  <img width={29} height={22} src={icon_testimonials} alt="" />
                                  <p className="testimonial-author">{testimonial.author}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/*=======  End of single testimonial item  =======*/}
                        </div>
                      </div>
                      {/*=======  End of testimonial wrapper  =======*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-row-slider-tab-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  section title  =======*/}
              <div className="section-title-wrapper text-center section-space--half">
                <h2 className="section-title">Sản phẩm mới nhất</h2>
                <p className="section-subtitle">
                High quality reputation and deep in the field of sports shoe fashion.
                </p>
              </div>
              {/*=======  End of section title  =======*/}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/*=======  tab slider wrapper  =======*/}
              <div className="tab-slider-wrapper">
                <div className="tab-product-navigation">
                  <OurProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-hover-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  banner hover wrapper  =======*/}
              <div className="banner-hover-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    {/*=======  single hover banner  =======*/}
                    <div className="single-hover-banner">
                      <div className="single-hover-banner__image">
                        <a href="javascript:void(0)">
                          <img width={570} height={319} src={banners_1} className="img-fluid" alt="" />
                        </a>
                        <div className="single-hover-banner__content">
                          <h4 className="small-text">Black Friday</h4>
                          <h3 className="big-text">Save Up To 50% Off</h3>
                          <a className="banner-link" href="javascript:void(0)">
                            SHOP NOW
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*=======  End of single hover banner  =======*/}
                  </div>
                  <div className="col-md-6">
                    {/*=======  single hover banner  =======*/}
                    <div className="single-hover-banner">
                      <div className="single-hover-banner__image">
                        <a href="javascript:void(0)">
                          <img width={570} height={319} src={banners_2} className="img-fluid" alt="" />
                        </a>
                        <div className="single-hover-banner__content">
                          <h4 className="small-text">Best Selling !</h4>
                          <h3 className="big-text">Living Room Up To 70% Off</h3>
                          <a className="banner-link" href="javascript:void(0)">
                            SHOP NOW
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*=======  End of single hover banner  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of banner hover wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="feature-logo-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  feature logo wrapper  =======*/}
              <div className="feature-logo-wrapper section-space--inner-bottom">
                <div className="row">
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={51} height={52} src={free_shipping} className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">FREE SHIPPING WORLDWIDE</h4>
                        <p className="short-desc">We offer free shipping via Standard Shipping on orders over $200.00</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={52} height={52} src={money_back} className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">MONEY BACK GUARANTEE</h4>
                        <p className="short-desc">If you're not satisfied with our product, we'll refund the purchase price*.</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={41} height={53} src={support247} className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">ONLINE SUPPORT 24/7</h4>
                        <p className="short-desc">Our friendly support team is available to help you 24 hours a day, seven days a week</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of feature logo wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
