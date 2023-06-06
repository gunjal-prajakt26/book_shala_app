import React, { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router";
import { DataContext } from "../../Context/DataContext";

export function ProductDetails() {
    const {items:{productData,cart, wishlist}, addToCart, addToWishlist}= useContext(DataContext);
  
    
    const { productId } = useParams();
    const navigate = useNavigate();
    
    const product = productData?.find((product) => {
        return product.id === productId;
    });

    const isInCart=cart.find(({_id})=>_id == product?._id);
    const addToCartHandler=()=>{
      isInCart
      ?navigate("/cart")
      :addToCart(product);
    }
    
    const isInWishlist= wishlist.find(({_id})=>_id == product?._id);
    const addToWishlistHandler=()=>{
      isInWishlist
      ?navigate("/wishList")
      :addToWishlist(product);
    }

    const discount=Math.floor(((product?.originalPrice-product?.price)/ product?.originalPrice)*100);


 
    return (
      <div className="item-page">
        <div className="item-content">
        <img className="item-img" src={product?.img} alt="" />            
          
          <div className="item-info">
            <div className="item-title">
              <h3 className="card-title-header">{product?.name}</h3>
              <div className="card-star">
                {product?.rating}
                <i class="bi bi-star-fill"></i>
              </div>
            </div>
            <div className="price-container">
            <div className="price">
              <p className="disc-price">₹{product?.price}</p>
              <p className="actual-price">₹{product?.originalPrice}</p>
              <p className="price-percentage">({discount}% OFF)</p>
            </div>
            <p className="paragraph">
            <i class="bi bi-lightning-fill"></i> Hurry , Only Few Left !
            </p>
            </div>
            <div className="offers-container">
            <span className="tag-msg">
              <i class="bi bi-tag-fill"></i> Fastest Delivery
            </span>
            <span className="tag-msg">
              <i class="bi bi-tag-fill"></i> Inclusive of All Taxes
            </span>
            <span className="tag-msg">
              <i class="bi bi-tag-fill"></i> Cash On Delivery Available
            </span>
            </div>
            <div className="other-info">
              <li>
                  <p>Author : <span>{product?.author}</span></p>
                  <p>Category : <span>{product?.category}</span></p>
                  <p>Binding : <span>Hard Cover</span></p>
                  <p>Language : <span>English</span></p>
              </li>
            </div>

            <button className="cart-btn" onClick={()=>addToCartHandler()}>
            <i class="bi bi-cart-check-fill"></i>{" "}
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>

            <button className="cart-btn" onClick={()=>addToWishlistHandler()}>
            <i class="bi bi-suit-heart-fill"></i>{" "}
              {isInWishlist ? "Go  to Wishlist " : "Add to Wishlist"}
            </button>
          </div>
        {product?.isBestSeller && <span className="seller-banner">Best Seller</span>}
        </div>
      </div>
    );
  }

