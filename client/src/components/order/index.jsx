import React from "react";
import Breadcumb from "../layouts/breadcumb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../App";

const Order = () => {
  const navigate = useNavigate();
  const cartByUserID = useSelector((state) => state.cart);
  return (
    <div>
      <Breadcumb parentTitle={"Trang chủ"} title={"Giỏ hàng"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <form action="#">
                    {/*=======  cart table  =======*/}
                    <div className="cart-table table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="pro-thumbnail">Ảnh</th>
                            <th className="pro-title">Sản phẩm</th>
                            <th className="pro-price">Giá</th>
                            <th className="pro-quantity">Số lượng</th>
                            <th className="pro-subtotal">Tổng</th>
                            <th className="pro-remove">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartByUserID?.cartData.length > 0 ? cartByUserID?.cartData?.map((product) =>
                            product.variant.map((variant) => (
                              <tr key={`${product.product_id}-${variant.color}-${variant.size}`}>
                                <td className="pro-thumbnail">
                                  <a href="javascript:void(0)">
                                    <img
                                      src={`http://localhost:5555${product.img_url}`}
                                      width={80}
                                      height={106}
                                      className="img-fluid"
                                      alt={product.name}
                                    />
                                  </a>
                                </td>
                                <td className="pro-title">
                                  <a href="javascript:void(0)">
                                    {product.name} - {variant.color} {variant.size}
                                  </a>
                                </td>
                                <td className="pro-price">
                                  <span>{formatCurrency(variant.price)}</span>
                                </td>
                                <td className="pro-quantity">
                                  <div className="quantity-selection">
                                    <input type="number" defaultValue={variant.quantity} min={1} disabled style={{ background: "#ebebeb" }} />
                                  </div>
                                </td>
                                <td className="pro-subtotal">
                                  <span>{formatCurrency(variant.price * variant.quantity)}</span>
                                </td>
                                <td className="pro-remove">
                                  <a href="#">
                                    <i className="fa fa-trash-o" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : <td colSpan={7} className="text-center py-5">Không có sản phẩm nào trong giỏ hàng</td>}
                        </tbody>
                      </table>
                    </div>
                    {/*=======  End of cart table  =======*/}
                  </form>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      {/*=======  Calculate Shipping  =======*/}
                      {/* <div className="calculate-shipping">
                        <h4>Calculate Shipping</h4>
                        <form action="#">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <select className="nice-select">
                                <option>Bangladesh</option>
                                <option>China</option>
                                <option>country</option>
                                <option>India</option>
                                <option>Japan</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-12">
                              <select className="nice-select">
                                <option>Dhaka</option>
                                <option>Barisal</option>
                                <option>Khulna</option>
                                <option>Comilla</option>
                                <option>Chittagong</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-12">
                              <input type="text" placeholder="Postcode / Zip" />
                            </div>
                            <div className="col-md-6 col-12">
                              <input type="submit" defaultValue="Estimate" />
                            </div>
                          </div>
                        </form>
                      </div> */}
                      {/*=======  End of Calculate Shipping  =======*/}
                      {/*=======  Discount Coupon  =======*/}
                      <div className="discount-coupon">
                        <h4>Mã giảm giá</h4>
                        <form action="#">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <input type="text" placeholder="Mã giảm giá" />
                            </div>
                            <div className="col-md-6 col-12">
                              <input type="submit" defaultValue="Apply Code" />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/*=======  End of Discount Coupon  =======*/}
                    </div>
                    <div className="col-lg-6 col-12 d-flex">
                      {/*=======  Cart summery  =======*/}
                      <div className="cart-summary">
                        <div className="cart-summary-wrap">
                          <h4>Tổng giỏ hàng</h4>
                          <p>
                            Tổng tiền{" "}
                            <span>
                              {" "}
                              {formatCurrency(cartByUserID.cartData.reduce(
                                (total, product) =>
                                  total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0),
                                0
                              ))}
                            </span>
                          </p>
                          <p>
                            Phí ship <span>30.000</span>
                          </p>
                          <h2>
                            Tổng cộng{" "}
                            <span>
                              {" "}
                              {formatCurrency(
                                cartByUserID.cartData.reduce(
                                  (total, product) =>
                                    total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0),
                                  0
                                )
                              )}
                            </span>
                          </h2>
                        </div>
                        <div className="cart-summary-button">
                          <button className="checkout-btn" onClick={() => {
                            if (cartByUserID?.cartData.length > 0) {
                              navigate("/checkout");
                            } else {
                              alert("Giỏ hàng không có sản phẩm để thanh toán");
                            }
                          }}>
                            Thanh toán
                          </button>
                          <button className="update-btn">Cập nhật giỏ hàng</button>
                        </div>
                      </div>
                      {/*=======  End of Cart summery  =======*/}
                    </div>
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

export default Order;
