import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router";
import "./WishlistCard.css"


export function WishlistCard({product}){

    const {items:{cart}, addToCart, removeFromWishlist}= useContext(DataContext);

  const navigate= useNavigate();

    const {
        _id: id,
        img,
        name,
        author,
        price,
        originalPrice,
        isBestSeller,
        rating,
      } = product;
  
      const discount=Math.floor(((originalPrice-price)/ originalPrice)*100);
    
      const isInCart=cart.find(({_id})=>_id == product?._id);
      const wishlistFunction=()=>{
        addToCart(product);
        removeFromWishlist(product._id);
      }
      const addToCartHandler=()=>{
        isInCart
        ?navigate("/cart")
        :wishlistFunction();
      }
      
      return (
        <div key={id} className="wishlist-product-card">
        <div className="wishlist-card">
        <div className="wishlist-img-container">
          <img
            className="wishlist-card-img"
            src={img}
            alt={name}
          />
          </div>
          <div className="wishlist-card-content">
          <div>
        <div className="wishlist-card-info">
        <p className="wishlist-card-title-header" title={name}>
                {name}
              </p>
              <p className="wishlist-card-description">{author}</p>
              </div>
          <div className="wishlist-card-price">
            <p className="disc-price"><b>₹{price}</b></p>
            <p className="actual-price"><b>₹{originalPrice}</b></p>
            <p className="price-percentage">({discount}% OFF)</p>
          </div>
          </div>
          <div className="wishlist-card-btns">
            <button onClick={()=>removeFromWishlist(product._id)}>Remove</button>
            <button onClick={()=>addToCartHandler()}>{isInCart?"Go to Cart":"Move To Cart"}</button>
          </div>
          </div>
          </div>
        </div>
      );
    }
    