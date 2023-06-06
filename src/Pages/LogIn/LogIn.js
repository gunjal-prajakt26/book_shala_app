import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext";
import "./LogIn.css";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {loginUser, token}= useContext(AuthContext);
  const {setIsLoad}= useContext(DataContext);
  const [form, setForm]= useState({email:"", password:""})

  const loginHandler=()=>{
    loginUser(form,{});
  }

  const dummyAddress={name: "Admin",
  street: "33 , MG Road",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  zipCode: "411046",
  mobile: "12345678",
}
  const testLoginHandler=()=>{
    loginUser({email: "adarshbalika@gmail.com",
    password: "adarshbalika"}, dummyAddress);
   
  }

  if (token) {
    setIsLoad(() => true);
    setTimeout(() => {
      navigate(location?.state?.from || "/products", { replace: true });
      setIsLoad(false);
    }, 500);
  }

  return (

    <div className="auth-container">
      <div className="auth-main-container">
        <div className="auth-title">
          <h2 className="">Sign In</h2>
        </div>
        <form className="auth-main">
          <div className="auth-email">
            <label htmlFor="mail">Email Address</label>
            <input
              placeholder="test@gmail.com"
              className="text-input"
              type="text"
              required
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />
          </div>

          <div className="auth-pwd">
            <label htmlFor="pwd">Password</label>
            <input
              placeholder="***********"
              className="input-pwd"
              type="password"
              required
              onChange={(e)=>setForm({...form, password:e.target.value})}
            />
          </div>

          <div className="auth-primary-btn" onClick={()=>loginHandler()}>
            <span className="login-btn">Login</span>
          </div>
          <div className="auth-primary-btn" onClick={()=>testLoginHandler()}>
            <span className="login-btn">Login with Test Credentials</span>
          </div>
          <Link className="auth-secondary-btn" to="/signUp">
              {"Create New Account >"}
          </Link>
        </form>
      </div>
    </div>
  );
}
