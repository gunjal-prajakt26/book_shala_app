import "./App.css";
import Mockman from 'mockman-js';
import { Header } from "./Components/Header";
import {Routes, Route} from "react-router-dom";
import {Home} from "./Components/Home";
import { Products } from "./Pages/Product/Products";
import { Cart } from "./Pages/Cart/Cart";
import { Checkout } from "./Pages/Cart/Checkout/Checkout";
import { WishList } from "./Pages/Wishlist/WishList";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { ProductDetails } from "./Pages/Product/ProductDetails";
import { Login } from "./Pages/LogIn/LogIn";
import { Signup } from "./Pages/LogIn/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { Order } from "./Pages/Orders/Order";

function App() {
  return (
    <div className="App">
    <ToastContainer
        position='top-right'
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    <div className="header-component">
      <Header />
      </div>
      <div className="app-body">
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/product/:productId" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
          <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
          <Route path="/order" element={<PrivateRoute><Order/></PrivateRoute>}/>
          <Route path="/wishList" element={<PrivateRoute><WishList /></PrivateRoute>}/>
          <Route path="/profilePage" element={<PrivateRoute><ProfilePage/> </PrivateRoute>}/>
          <Route path="/mockman" element={<Mockman/>}/>
        </Routes>
        </div>
    </div>
  );
}

export default App;
