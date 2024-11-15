import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Breadcumb from "../layouts/breadcumb";

//
import axios from "axios";
import { useLocation } from "react-router-dom";
import Product from ".";
import OurProducts from "../home/OurProducts";
import { fetchCartDetailByUserID } from "../../store/cart";
import { useDispatch } from "react-redux";
import { NotificationContext, openNotificationWithIcon } from "../../App";
import { notification } from "antd";

const ProductDetail = () => {
  const api = useContext(NotificationContext);

  const location = useLocation();
  const userInfor = localStorage.getItem("user");
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const dispatch = useDispatch();

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const bigImageSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    fade: true,
    speed: 500,
    asNavFor: nav2, // Liên kết với slider nhỏ
  };

  // Cấu hình cho slider nhỏ
  const smallImageSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 500,
    focusOnSelect: true,
    centerMode: false,
    asNavFor: nav1, // Liên kết với slider lớn
    prevArrow: <button className="slick-prev fa fa-angle-left"></button>,
    nextArrow: <button className="slick-next fa fa-angle-right"></button>,
    responsive: [
      { breakpoint: 1905, settings: { slidesToShow: 3 } }, // Updated to your screen width
      { breakpoint: 1705, settings: { slidesToShow: 3 } }, // Updated to your screen width
      { breakpoint: 1501, settings: { slidesToShow: 3 } },
      { breakpoint: 1199, settings: { slidesToShow: 2 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
      { breakpoint: 479, settings: { slidesToShow: 1 } },
    ],
  };

  //  show tab
  const [activeTab, setActiveTab] = useState("description");

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // lấy dữ liệu chi tiết sản phẩm
  const [data, setData] = useState([]);

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetDetailProduct();
  }, []);

  // lấy toàn bộ ds
  const handleGetDetailProduct = async () => {
    try {
      const id = location?.pathname.split("/")[2];
      const response = await axios.get(`http://localhost:5555/api/product/${id}`);

      if (response.status === 200) {
        setData(response.data);
        // lưu list category vào store
        // dispatch(setListCategory(response.data));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  // State lưu trữ size, color được chọn
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [quantity, setQuantity] = useState(null);

  // Khi component load lần đầu, đặt mặc định size và color từ biến thể đầu tiên
  useEffect(() => {
    if (data?.variants?.length > 0) {
      setSelectedSize(data.variants[0].size);
      setSelectedColor(data.variants[0].color);
      setQuantity(data.variants[0].stock);
    }
  }, [data]);

  // Hàm để tìm biến thể dựa trên size và color
  useEffect(() => {
    if (selectedSize && selectedColor) {
      const variant = data?.variants?.find((v) => v.size === selectedSize && v.color === selectedColor);
      setSelectedVariant(variant);
    }
  }, [selectedSize, selectedColor, data]);

  // hàm gọi khi thay đổi size
  const handleChangeSize = (size) => {
    const selectedSize = size.target.value;
    setSelectedSize(selectedSize);
    setQuantity(null);

    // Tìm kiếm biến thể theo đầu tiên theo size
    const firstVariantForSize = data?.variants?.find((v) => v.size === selectedSize);

    if (firstVariantForSize) {
      setSelectedColor(firstVariantForSize.color);
      setQuantity(firstVariantForSize.stock);
    }
  };

  // hàm khi thêm sản phẩm vào giỏ hàng
  const handleAddCart = async () => {
    try {

      // Thay thế Fetch API bằng Axios
      const response = await axios.post(
        "http://localhost:5555/api/add-to-cart",
        {
          product_id: data._id, // Thay thế bằng ID sản phẩm của bạn
          variant: [
            {
              color: selectedVariant.color,
              size: selectedVariant.size,
              sku: selectedVariant.sku,
              stock: selectedVariant.stock,
              price: selectedVariant.price,
              _id: selectedVariant._id,
              quantity: quantity, // Gửi giá trị quantity ở đây
            },
          ], // Dữ liệu biến thể từ selectedVariant
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token để xác thực
          },
        }
      );

      if (response && response.status === 200) {
        dispatch(fetchCartDetailByUserID({ token, userId: userInfor._id }));
        openNotificationWithIcon(api, "success", "Thêm vào giỏ hàng thành công", "Thêm vào giỏ hàng thành công");
      } else {
        openNotificationWithIcon(api, "error", "Thêm vào giỏ hàng thất bại", "Thêm vào giỏ hàng thất bại");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      openNotificationWithIcon(api, "error", "Thêm vào giỏ hàng thất bại", "Thêm vào giỏ hàng thất bại");
    }
  };

  console.log(selectedVariant, "1111", quantity);
  

  return (
    <div>
      <Breadcumb parentTitle={"Sản phẩm"} title={"Giầy Thể Thao"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  {/*=======  single product main content area  =======*/}
                  <div className="single-product-main-content-area section-space">
                    <div className="row">
                      <div className="col-lg-6">
                        {/*=======  product details slider area  =======*/}
                        <div className="product-details-slider-area">
                          <div className="big-image-wrapper">
                            {/* Slider lớn */}
                            {/* thêm điều kiện check lần đầu vào trang để hiện ảnh khi call api chưa có data */}
                            {data?.image && data.image.length > 0 && (
                              <Slider {...bigImageSettings} className="big-image-slider" asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                                {data.image.map((x, index) => (
                                  <div className="single-image" key={index}>
                                    <img src={`http://localhost:5555${x.img_url}`} alt="" width={600} height={800} style={{ objectFit: "contain" }} />
                                  </div>
                                ))}
                              </Slider>
                            )}
                          </div>
                          <div className="product-details-small-image-slider-wrapper">
                            {/* Slider nhỏ */}
                            {/* thêm điều kiện check lần đầu vào trang để hiện ảnh khi call api chưa có data */}
                            {data?.image && data.image.length > 0 && (
                              <Slider {...smallImageSettings} className="small-image-slider" asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
                                {data.image.map((x, index) => (
                                  <div className="single-image" key={index}>
                                    <img src={`http://localhost:5555${x.img_url}`} alt="" width={170} height={226} />
                                  </div>
                                ))}
                              </Slider>
                            )}
                          </div>
                        </div>

                        {/*=======  End of product details slider area  =======*/}
                      </div>
                      <div className="col-lg-6">
                        {/*=======  single product content description  =======*/}
                        <div className="single-product-content-description">
                          <p className="single-info">
                            Brands <a>Dolor</a>
                          </p>
                          <h4 className="product-title">{data?.name}</h4>
                          <div className="product-rating">
                            <span className="rating">
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star-outline" />
                            </span>
                            <span className="review-count">
                              {" "}
                              <a href="#">(2 reviews)</a> | <a href="#">Write A Review</a>{" "}
                            </span>
                          </div>
                          <p className="single-grid-product__price">
                            <span className="discounted-price">{data?.variants?.length > 0 && data?.variants[0]?.price}</span>{" "}
                            <span className="main-price discounted">$120.00</span>
                          </p>
                          <p className="single-info">
                            Product Code: <span className="value">CODE123</span>{" "}
                          </p>
                          <p className="single-info">
                            Reward Points: <span className="value">200</span>{" "}
                          </p>
                          <p className="single-info">
                            Availability: <span className="value">In Stock</span>
                          </p>
                          <p className="product-description">{data?.description}</p>
                          <div className="size mb-20">
                            <span className="title">Kích cỡ:</span> <br />
                            <select name="chooseSize" id="chooseSize" className="nice-select" value={selectedSize} onChange={handleChangeSize}>
                              {/* Lấy các kích thước không trùng lặp */}
                              {[...new Set(data?.variants?.map((x) => x.size))].map((size, index) => (
                                <option key={index} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Hiển thị lựa chọn Color */}
                          <div className="color mb-20">
                            <span className="title">Màu:</span> <br />
                            {data?.variants
                              ?.filter((x) => x.size === selectedSize) // Lọc theo size đã chọn
                              .map((x, index) => (
                                <a key={index} onClick={() => setSelectedColor(x.color)} className={x.color === selectedColor ? "active" : ""}>
                                  <span className={`color-block color-choice-${x.color}`} />
                                </a>
                              ))}
                          </div>
                          {selectedVariant && (
                            <div className="product-actions">
                              <div className="quantity-selection">
                                <label>Số lượng</label>
                                {/* Sử dụng value thay vì defaultValue để đảm bảo cập nhật số lượng đúng */}
                                <input
                                  type="number"
                                  value={quantity ?? selectedVariant?.stock}
                                  min={1}
                                  max={selectedVariant.stock}
                                  onChange={(e) => {
                                    setSelectedVariant({ ...selectedVariant, stock: e.target.value });
                                    setQuantity(Number(e.target.value))
                                  }}
                                />
                              </div>
                              <div className="product-buttons">
                                <a className="cart-btn" onClick={() => handleAddCart()}>
                                  <i className="ion-bag" /> Thêm giỏ hàng
                                </a>
                                {/* <span className="wishlist-compare-btn">
                                  <a>
                                    <i className="ion-heart" />
                                  </a>
                                  <a>
                                    <i className="ion-android-options" />
                                  </a>
                                </span> */}
                              </div>
                            </div>
                          )}
                        </div>
                        {/*=======  End of single product content description  =======*/}
                      </div>
                    </div>
                  </div>

                  {/*=======  End of single product main content area  =======*/}
                  {/*=======  product description review   =======*/}
                  <div className="product-description-review-area">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tab-slider-wrapper product-description-review-container section-space--inner">
                          {/* Tab Navigation */}
                          <nav>
                            <div className="nav nav-tabs justify-content-center" role="tablist">
                              <a
                                className={`nav-item nav-link ${activeTab === "description" ? "active" : ""}`}
                                onClick={() => handleTabChange("description")}
                                role="tab"
                                aria-selected={activeTab === "description"}
                                style={{ cursor: "pointer" }}>
                                Mô tả
                              </a>
                              <a
                                className={`nav-item nav-link ${activeTab === "review" ? "active" : ""}`}
                                onClick={() => handleTabChange("review")}
                                role="tab"
                                aria-selected={activeTab === "review"}
                                style={{ cursor: "pointer" }}>
                                Bình luận (1)
                              </a>
                            </div>
                          </nav>

                          {/* Tab Content */}
                          <div className="tab-content">
                            {/* Description Tab */}
                            {activeTab === "description" && (
                              <div className="tab-pane fade show active">
                                <div className="product-description">{data?.description}</div>
                              </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === "review" && (
                              <div className="tab-pane fade show active">
                                <div className="product-rating-wrap">
                                  <div className="pro-avg-rating">
                                    <h4>
                                      4.5 <span>(Overall)</span>
                                    </h4>
                                    <span>Based on 9 Comments</span>
                                  </div>
                                  <div className="rating-list">
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <span>(5)</span>
                                    </div>
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <span>(3)</span>
                                    </div>
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <i className="fa fa-star-o" />
                                      <span>(1)</span>
                                    </div>
                                  </div>
                                  <div className="ratings-wrapper">
                                    <div className="sin-ratings">
                                      <div className="rating-author">
                                        <h3>Cristopher Lee</h3>
                                        <div className="rating-star">
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <span>(5)</span>
                                        </div>
                                      </div>
                                      <p>
                                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem
                                        sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
                                      </p>
                                    </div>
                                    <div className="sin-ratings">
                                      <div className="rating-author">
                                        <h3>Rashed Mahmud</h3>
                                        <div className="rating-star">
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <span>(5)</span>
                                        </div>
                                      </div>
                                      <p>
                                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem
                                        sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rating-form-wrapper fix">
                                    <h3>Add your Comments</h3>
                                    <form action="#">
                                      <div className="rating-form row">
                                        <div className="col-12 mb-15">
                                          <h5>Rating:</h5>
                                          <div className="rating-star fix">
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-12 form-group">
                                          <label htmlFor="name">Name:</label>
                                          <input id="name" placeholder="Name" type="text" />
                                        </div>
                                        <div className="col-md-6 col-12 form-group">
                                          <label htmlFor="email">Email:</label>
                                          <input id="email" placeholder="Email" type="text" />
                                        </div>
                                        <div className="col-12 form-group">
                                          <label htmlFor="your-review">Your Review:</label>
                                          <textarea name="review" id="your-review" placeholder="Write a review" />
                                        </div>
                                        <div className="col-12">
                                          <input defaultValue="add review" type="submit" />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*=======  End of product description review   =======*/}
                  {/*====================  single row slider ====================*/}
                  <div className="single-row-slider-area section-space--inner-top">
                    <div className="row">
                      <div className="col-lg-12">
                        {/*=======  section title  =======*/}
                        <div className="section-title-wrapper text-center section-space--half">
                          <h2 className="section-title">Sản phẩm liên quan</h2>
                          <p className="section-subtitle">
                            Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas.
                          </p>
                        </div>
                        {/*=======  End of section title  =======*/}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        {/*=======  single row slider wrapper  =======*/}
                        <OurProducts />
                        {/*=======  End of single row slider wrapper  =======*/}
                      </div>
                    </div>
                  </div>
                  {/*====================  End of single row slider  ====================*/}
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

export default ProductDetail;
