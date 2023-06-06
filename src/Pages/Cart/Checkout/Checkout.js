import { useContext } from "react";
import { DataContext } from "../../../Context/DataContext";
import "./Checkout.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import { v4 as uuid } from "uuid";


export function Checkout(){
    const {items:{cart,address,orderAddress},couponValue,setCoupon,setCouponValue, setItems,clearCart}= useContext(DataContext);
  const navigate= useNavigate();
  const {user}= useContext(AuthContext);
    const { firstName, lastName , email}= user;

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

      
      const totalAmt = parseFloat(price - discount -couponValue ).toFixed(2);
      const totalDiscount = parseFloat(discount - couponValue).toFixed(2);
      

      const displayOrders =()=>{
            const orderData = {
              products: [...cart],
              amount: totalAmt,
              paymentId: uuid(),
              delivery: orderAddress,
            };
            setItems({type:"ADD_ORDER", payload:{ ...orderData }});
            clearCart(cart);
            setCoupon(false);
          setCouponValue(0)    
          navigate("/order");
      };
    

      const placeOrderHandler=()=>{
        if (address.length === 0) {
            toast.error("Please Add Address");
            setTimeout(() => {
              navigate("/profilePage");
            }, 1500);
          } else {
            !orderAddress.name 
            ?toast.error("Please Select Address") 
            :displayOrders();
          }
        };
      
    return (
        <div className="checkout-card">
        <div className="coupon-title">
        <p>Order Details</p>
        </div>
        <div className="checkout-items">
        <li>
            <p>Name</p>
            <p>Quantity</p>
        </li>
        </div>
        <div className="price-details">
        {
            cart.map(({_id, name, qty})=>(
                <li key={_id}>
                    <p>{name}</p>
                    <p>{qty}</p>
                </li>
            ))
        }
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
        <div className="">
        {
            address.length <= 0
            ?(<h4>No Saved Address</h4>)
            :address.map(({_id,name,street,city,state,country,zipCode,mobile})=>(
                <div className="checkout-address-list" key={_id}>
                <input type={"radio"} name="address" checked={orderAddress._id === _id}
                          onChange={() =>
                            setItems({
                              type: "ORDER_ADDRESS",
                              payload: {
                                _id,
                                name,
                                street,
                                city,
                                state,
                                country,
                                zipCode,
                                mobile,
                              },
                            })
                          }/>
                <div>
                    <h4>{name}</h4>
                    <p>{street}, {city}, {state}, {zipCode}, {country}</p>
                    <p>Phone :{mobile}</p>
                    </div>
                </div>
            ))
        }
        </div>
        <div className="checkout-btn">
        <button onClick={()=>placeOrderHandler()}>Place Order</button>
        </div>
        </div>
    )
}