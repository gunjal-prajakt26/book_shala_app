import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { FilterContext } from "../../Context/FilterContext";
import { ProductCard } from "./ProductCard";
import "./Products.css";

export function Products() {
  const [rangeInput, setRangeInput]= useState(699);

  const {items:{productData,categories},  isError, isLoad}= useContext(DataContext);
  const {filters, setFilters}= useContext(FilterContext);

  const onRangeChange=(inputValue)=>{
    setRangeInput(inputValue);
    setFilters({type:"SORT_BY_PRICE_RANGE", payLoad:inputValue});
  }

  const productItems=({searchInput, sortByRating, sortByPrice,rangeOfPrice,categoryTypes})=>{

    let itemsData= productData;

    itemsData= !searchInput.length
               ? itemsData
               : itemsData.filter((obj) =>obj.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  itemsData = sortByRating=== "1"
              ?itemsData.filter((obj)=>obj.rating >= sortByRating)
              : sortByRating=== "2"
              ? itemsData.filter((obj)=>obj.rating >= sortByRating)
              :sortByRating==="3"
              ? itemsData.filter((obj)=>obj.rating >= sortByRating)
              :sortByRating==="4"
              ? itemsData.filter((obj)=>obj.rating >= sortByRating)
              :itemsData;
          
  itemsData= sortByPrice === "asc"
            ? itemsData.sort((a, b) => a.price - b.price)
            : sortByPrice === "desc"
            ? itemsData.sort((a, b) => b.price - a.price)
            : itemsData;
            
  itemsData= rangeOfPrice.length 
             ?itemsData.filter((obj)=>obj.price <= rangeOfPrice)
             :itemsData;

  itemsData= categoryTypes.length>0
             ?itemsData.filter(({category}) =>categoryTypes.includes(category))
             :itemsData;

  return itemsData;

  }

  const filteredData=productItems(filters);
  return (
    <div className="product-page">
    <div className="product-filters">
        <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={()=>setFilters({type:"CLEAR_FILTERS"})}>Clear</button>
        </div>
        <div className="price-slider">
            <label>Price : ₹ {rangeInput}</label><br/>
            <input type="range" id="price" name="price" min="50" max="699" value={filters.rangeOfPrice} onChange={(e)=>onRangeChange(e.target.value)}/>
        </div>
        <div className="product-category-filter">
        <p className="product-category-label">Category</p>
        <div className="product-categories">
        {categories?.map(({categoryName})=>(
            <li key={categoryName}>
            <input
            type="checkbox"
            value={categoryName}
            checked={filters.categoryTypes.includes(categoryName)}
            onClick={(e)=>setFilters({type:"ADD_CATEGORY", payLoad:e.target.value})}
          />{categoryName}</li>
        ))}
        </div>
        </div>
        <div className="rating-filter">
        <p className="rating-title">Ratings</p>
        <div className="radio-btn">
        <input type="radio" name="ratings" value="1" checked={filters.sortByRating.includes("1")} onClick={(e)=>setFilters({type:"SORT_BY_RATINGS", payLoad:e.target.value})}/>1 Stars & above<br/>
        <input type="radio" name="ratings" value="2" checked={filters.sortByRating.includes("2")} onClick={(e)=>setFilters({type:"SORT_BY_RATINGS", payLoad:e.target.value})}/>2 Stars & above<br/>
        <input type="radio" name="ratings" value="3" checked={filters.sortByRating.includes("3")} onClick={(e)=>setFilters({type:"SORT_BY_RATINGS", payLoad:e.target.value})}/>3 Stars & above<br/>
        <input type="radio" name="ratings" value="4" checked={filters.sortByRating.includes("4")} onClick={(e)=>setFilters({type:"SORT_BY_RATINGS", payLoad:e.target.value})}/>4 Stars & above
        </div>
        </div>
        <div className="sort-filter">
        <p>Sort By</p>
        <div className="sort-radio-btn">
        <input
            type="radio"
            name="sortByRadio"
            value="desc"
            checked={filters.sortByPrice.includes("desc")}
            onClick={(e)=>setFilters({type:"SORT_BY_PRICE", payLoad:e.target.value})}
          />
          Price-High to Low
          <br/>
          <input
            type="radio"
            name="sortByRadio"
            value="asc"
            checked={filters.sortByPrice.includes("asc")}
            onClick={(e)=>setFilters({type:"SORT_BY_PRICE", payLoad:e.target.value})}
          />
          Price - Low to High
        </div>
        </div>
    </div>
    <div className="list">
          {filteredData.length > 0
        ?<h3 className="page-title">Showing All Products <span className="product-count">({filteredData.length} Products)</span></h3>
        :""
          }
        {isError? <h1>Error</h1>
      :isLoad?<h1>Loading</h1>
      :filteredData.length > 0
      ?<div className="product-cards">
        {filteredData.map((obj)=>(
        <ProductCard key={obj._id} product={obj} />
      ))}
        </div>
      :(<p className="emty-msg">"Sorry , Products are not available for chosen category."</p>)
      }
        </div>
    </div>
  );
}
