import "./Header.css";
import {Link} from "react-router-dom";
import { useNavigate} from "react-router";
import { useContext} from "react";
import { FilterContext } from "../Context/FilterContext";
import { Cart } from "../Pages/Cart/Cart";
import { DataContext } from "../Context/DataContext";

export function Header() {
    const {filters,setFilters}= useContext(FilterContext);
    const navigate = useNavigate();
    const {items:{cart, wishlist}}=useContext(DataContext);
    const inputHandler= (inputValue)=>{
        navigate("/products")
        setFilters({type:"SEARCH_BY_INPUT", payLoad:inputValue})
    }

    return (
        <div className="app-header">
            <div className="app-title">
            <Link className="link" to="/"><h1>Book-Shala</h1></Link>
            </div>
            <div className="app-searchbar">
            <input id="searchBar" placeholder="Search Item" type="text" value={filters.searchInput} onChange={(e)=> inputHandler(e.target.value)}/>
            </div>
            <div className="app-features">
            <p><Link className="link" to="/products"><i class="bi bi-bag-fill"></i></Link></p>
            <p><Link className="link" to="/cart"><i class="bi bi-cart-check-fill"></i>{cart.length >0 && cart.length}</Link></p>
            <p><Link className="link" to="/wishList"><i class="bi bi-suit-heart-fill"></i>{wishlist.length >0 &&wishlist.length}</Link></p>
            <p><Link className="link" to="/profilePage"><i class="bi bi-person-circle"></i></Link></p>
            </div>
        </div>
    )
}