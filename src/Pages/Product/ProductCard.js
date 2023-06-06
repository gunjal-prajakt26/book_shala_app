import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router";
import "./ProductCard.css"
import { AuthContext } from "../../Context/AuthContext";

export function ProductCard({ product }) {

  const {items:{cart, wishlist}, addToCart, addToWishlist, removeFromWishlist}= useContext(DataContext);
  const {token}= useContext(AuthContext);

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
  
    const isInCart=cart.find(({_id})=>_id == id);
    const addToCartHandler=()=>{
      token
      ?isInCart
        ?navigate("/cart")
        :addToCart(product)
      :navigate("/login");
    }
    
    const isInWishlist= wishlist.find(({_id})=>_id == id);
    const addToWishlistHandler=()=>{
      token
      ?isInWishlist
        ?removeFromWishlist(id)
        :addToWishlist(product)
      :navigate("/login");
    }
    return (
      <div key={id} className="product-card">
      <div className="product-img-container">
        <img
          className="product-card-img"
          src={img}
          alt={name}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <p className="product-whishlist-icon"><i class="bi bi-suit-heart-fill" style={{color:isInWishlist?"red":"gray"}} onClick={()=>addToWishlistHandler()}></i></p>
        </div>
        <div className="product-card-content">
        <div className="product-card-details">
        <div className="product-card-info">
        <p className="product-card-title-header" title={name}>
                {name}
              </p>
              <p className="product-card-description">{author}</p>
              </div>
              <div className="product-card-star">
                <p><i class="bi bi-star-fill"></i> {rating} </p>
              </div>
          </div>
          <div className="product-price">
            <p className="product-disc-price"><b>₹{price}</b></p>
            <p className="product-actual-price"><b>₹{originalPrice}</b></p>
            <p className="product-price-percentage">({discount}% OFF)</p>
          </div>
        <button className="product-cart-btn" onClick={()=>addToCartHandler()}>{isInCart?"Go to Cart":"Add to Cart"}</button>
        </div>
        
        {isBestSeller? (<p className="product-best-seeler-banner">BestSeller</p>):""}
        
      </div>
    );
  }
  