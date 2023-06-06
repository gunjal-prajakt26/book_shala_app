import {createContext, useState, useEffect, useReducer, useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const DataContext = createContext();

const DataReducerFun=(state,action)=>{
    const {type,payLoad}= action;
    switch (type) {
        case "SET_PRODUCT_DATA":
                return {...state, productData:payLoad, data:payLoad };
            break;
        case "SET_CATEGORIES_DATA":
            return {...state, categories:payLoad};
            break;

        case "ADD_TO_CART":
            return {
                ...state,
                cart: payLoad
              }
            break;
        case "CLEAR_CART":
            return {
                ...state,
                cart: []
              }
            break;

        case "REMOVE_FROM_CART":
            return {
                ...state, cart:payLoad
            }
            break;
        
        case "UPDATE_CART_QUANTITY":
            return {...state, cart:payLoad};
            break;
        
        case "REMOVE_FROM_WHISHLIST":
            return {
                ...state, wishlist:payLoad
            }
            break;

        case "ADD_TO_WHISHLIST":
            return {
                ...state,
                wishlist:payLoad
              }
            break;
        
        case "INITIAL_ADDRESS":
            return {
                ...state,
                address:[...state.address,payLoad.address]
              }
            break;
        case "ADD_ADDRESS":
          return {
            ...state,
                address:[...state.address,payLoad.address]
              }
              break;

        case "UPDATE_ADDRESS": {
          return {
            ...state,
            address: state.address.map((el) => {
              return el._id === payLoad.address._id
                ? payLoad.address
                : el;
            }),
          };
        }
              break;

        case "DELETE_ADDRESS": {
          return {
            ...state,
            address: state.address.filter(
              (el) => el._id !== payLoad
            ),
          };
        }
              break;
        
        case "ORDER_ADDRESS":
          return {
            ...state,
            orderAddress: { ...action.payload },
          };
          break;

        case "ADD_ORDER":
          return {
            ...state,
            order: { ...action.payload },
          };
        
          case "LOG_OUT":
            return {
              ...state,
              cart: [],
              wishlist: [],
              address: [],
            };
            break;

            default:
              return state;
              break;
            }
          }
            
            
export function DataProvider({children}){

        const [isLoad, setIsLoad]= useState(true);
        const [isError, setIsError]= useState(false);
        const [coupon, setCoupon]= useState(false);
        const [couponValue, setCouponValue]= useState(0);
        const token= localStorage.getItem("token");
        const initialData = {productData:[],categories:[], cart:[], wishlist:[], address:[],orderAddress:{}, order:[]}; 
        
        const [items, setItems] = useReducer(DataReducerFun, initialData);
        
        const addToCart= async (product)=>{
          try {
            const {
      data: { cart },
    } = await axios.post(
      "/api/user/cart",
      {
        product,
      },
      {
        headers: {
          authorization: token,
        },
      }
      );
      setItems({type:"ADD_TO_CART", payLoad:cart});
      toast.success("Added In Cart !");
    }catch (error) {
      toast.error("Something Went Wrong !");
      console.log("Error in addToCart service", error);
    }
  }
  
  const removeFromCart= async (id)=>{
    try {
      const {
        data: { cart },
      } = await axios.delete(`api/user/cart/${id}`, {
        headers: {
          authorization: token,
        },
      }); 
      setItems({type:"REMOVE_FROM_CART", payLoad:cart})    
      toast.error("Removed From Cart !");
    } catch (error) {
      toast.error("Something Went Wrong !");
      console.log("Error in service", error);
    }
  }
  
const updateQuantityofCart=async (id,actionType)=>{
try {
  const {
    data: { cart },
  } = await axios.post(
    `api/user/cart/${id}`,
    {
      action: {
        type: actionType === "INC_QTY" ? "increment" : "decrement",
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
        );
        
        setItems({type:"UPDATE_CART_QUANTITY", payLoad:cart})
      } catch (error) {
        console.log("Error in updateQtyFromCart service", error);
      }
    }
    
const clearCart=async (cart)=> {
      try {
        for (const item of cart) {
          await axios.delete(`api/user/cart/${item._id}`, {
            headers: {
              authorization: token,
            },
          });
        }
        setItems({
          type: "CLEAR_CART",
        });
      } catch (error) {
        console.log("Error in clear cart service", error);
      }
    }
    
    const addToWishlist= async ( product)=>{
      try {
        const {
          data: { wishlist },
      } = await axios.post(
        "/api/user/wishlist",
        {
          product,
        },
        {
          headers: {
            authorization: token,
          },
        }
        );
        setItems({type:"ADD_TO_WHISHLIST", payLoad:wishlist});
        toast.success("Added In Wishlist !");
      } catch (error) {
        toast.error("Something Went Wrong !");
        console.log("Error in Add To Wishlist Service", error);
      }
    }
    
    const removeFromWishlist= async (id)=>{
      try {
        const {
          data: { wishlist },
        } = await axios.delete(`api/user/wishlist/${id}`, {
          headers: {
            authorization: token,
          },
        })
        setItems({type:"REMOVE_FROM_WHISHLIST", payLoad:wishlist})
  toast.error("Removed From Wishlist  !");
} catch (error) {
  toast.error("Something Went Wrong !");
  console.log("Error in Remove From Wishlist Service", error);
}
}

useEffect(() => {
  (async () => {
    try {
      const dataResponse= await fetch("/api/products");
      const list=await dataResponse.json();
      setItems({type:"SET_PRODUCT_DATA", payLoad:list.products})
      
      const categoryResponse= await fetch("/api/categories", {method:"GET"});
      const catgoryList = await categoryResponse.json();
      setItems({type:"SET_CATEGORIES_DATA", payLoad:catgoryList.categories})
      
      setIsLoad(false);
      
    } catch (error) {
      setIsLoad(false);
      console.error(error)
      setIsError(true);
    }
    })();
  }, [])
  
        
    return (
        <>
            <DataContext.Provider value={{items, setItems,setIsLoad,setIsError, isError, isLoad, addToCart, addToWishlist, removeFromCart,clearCart, removeFromWishlist, updateQuantityofCart,coupon,setCoupon,couponValue, setCouponValue}}>
                {children}
            </DataContext.Provider>
        </>
    )
} 
