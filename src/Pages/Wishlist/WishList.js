import { useContext } from "react"
import { DataContext } from "../../Context/DataContext"
import { WishlistCard } from "./WishlistCard";

export function WishList(){
    const {items:{wishlist}}= useContext(DataContext);
    return (
        <div>
            <h1>WishList Page {wishlist.length > 0
            ?<span className="product-count">({wishlist.length} Products)</span>
            :""
            }</h1>
            <div className="cards">
            {
            wishlist.length > 0
            ?wishlist.map((obj)=>(<WishlistCard key={obj._id} product={obj} />))
            :(<p className="emty-msg">Your Wishlist Is Empty ! ☹️</p>)
            }
            </div>
        </div>
    )
}
