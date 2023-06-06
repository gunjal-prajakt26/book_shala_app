import { useContext } from "react";
import {Link} from "react-router-dom"
import { DataContext } from "../Context/DataContext";
import { AppFooter } from "./AppFooter";
import "./Home.css";
import { useNavigate} from "react-router";
import { FilterContext } from "../Context/FilterContext";

export function Home(){
  const {items:{categories}}= useContext(DataContext);
  const navigate = useNavigate();
  const {filters, setFilters}= useContext(FilterContext);

  const clickHandler=(category)=>{
    console.log(category);
    setFilters({type:"ADD_CATEGORY", payLoad:category});
    navigate("/products");
  }

    return (
        <div className="main-text">
           <img src="https://pustaka-react.netlify.app/static/media/home-img.839d5b46.jpg"/>
           <div className="content-text">
              <h4>
                Welcome to <span className="title">Boosk-Shala</span>
              </h4>
              <div>
                <h1 className="main-text-title">For All Your</h1>
                <h1 className="main-text-title">Reading Needs</h1>
              </div>
              <Link to="/products">
                <button className="shop-now-btn">SHOP NOW</button>
              </Link>
              </div>
          <div className="category-container">
          <div className="container">
            <div className="category-heading">
              <h2>Featured Book Categories</h2>
              <p className="paragraph-md">
                There are many categories of books available at Pustaka. Choose your favorite one
                now.
              </p>
            </div>
            <div className="category-row">
              {categories &&
                categories.map(({ _id, categoryName, description }) => {
                  return (
                    <div className="box" key={_id} onClick={()=>clickHandler(categoryName)}>
                      <div className="detail-box">
                        <h4>{categoryName}</h4>
                        <p className="paragraph-sm">{description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
              <div className="footer-component">
      <AppFooter />
      </div>
            </div>
    )
}