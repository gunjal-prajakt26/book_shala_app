import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router";
import "./couponModel.css"


export function CouponModel(){
  
  const navigate= useNavigate();
  const {items:{cart},coupon,setCoupon,couponValue, setCouponValue}= useContext(DataContext);
  
    const {price , discount}= cart.reduce(
        ({ price, discount }, item) => {
          price += item.originalPrice * item.qty;
          discount += (item.originalPrice - item.price) * item.qty;
          return { price, discount };
        },
        {
          price: 0,
          discount: 0,
        }
        );

        const applyHandler=()=>{
          setCoupon(true);
          setCouponValue(Math.floor((parseFloat(price - discount) / 100) * 10))
        }
      
      const totalAmt = parseFloat(price - discount -couponValue ).toFixed(2);
      const totalDiscount = parseFloat(discount - couponValue).toFixed(2);

      

    return (
        <div className="coupon-card">
            <div className="coupon-btn">
                <p>10% OFF Coupon?</p>
                <button disabled={coupon} onClick={()=>applyHandler()}>{coupon ?"Applied":"Apply"}</button>
            </div>
            <div className="coupon-title">
        <p>Price Details</p>
        </div>
        <div className="price-details">
          <li>
            <p>Price ({cart.length} items)</p>
            <p>₹ {price}</p>
          </li>
          <li>
            <p>Discount</p>
            <p>-₹ {discount}</p>
          </li>
          <li>
            <p>Delivery Charges</p>
            <p>FREE</p>
          </li>
          <li>
            <p>Coupon Discount</p>
            <p>
            ₹ {couponValue}
            </p>
          </li>
        </div>
        <div className="total-amount">
        <li>
            <p>Total Amount</p>
            <p>
            ₹ {totalAmt}
            </p>
          </li>
        </div>
        <div className="total-discount">
            <p>You will save ₹ {totalDiscount} on this order</p>
        </div>
        <div className="checkout-btn">
        <button onClick={()=>navigate("/checkout")}>Checkout</button>
        </div>
        </div>
    )
}