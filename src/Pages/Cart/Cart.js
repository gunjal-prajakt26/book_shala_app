import { useContext } from "react"
import { DataContext } from "../../Context/DataContext"
import { CartCard } from "./CartCard";
import "./Cart.css";
import { CouponModel } from "./CouponModel";

export function Cart(){
    const {items:{cart}}= useContext(DataContext);
    return (
        <div>
            <h1>Cart Page {cart.length > 0
            ?<span className="product-count">({cart.length} Products)</span>
            :""
            }</h1>
            {
            cart.length <= 0
            ?(<p className="emty-msg">Your Cart Is Empty ! ☹️</p>)
            :(<div className="cart"><div className="cards">
            {cart.map((obj)=>(<CartCard key={obj._id} product={obj} />))} 
            </div>
            <div className="coupon-model">
                <CouponModel />
            </div> 
            </div>
            )
            }
        </div>
    )
}