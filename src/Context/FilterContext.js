import {createContext, useReducer} from "react";

export const FilterContext = createContext();

const filterFunction=(state, {type, payLoad})=>{
    switch (type) {
        case "SEARCH_BY_INPUT":
           return {...state, searchInput:payLoad};
            break;
            
            case "SORT_BY_RATINGS":
           return {...state,sortByRating :payLoad};
                    break;
           
             case "SORT_BY_PRICE":
           return {...state,sortByPrice :payLoad};
                    break;

        case "SORT_BY_PRICE_RANGE":
            return {...state,rangeOfPrice:payLoad};
            break;
        case "REMOVE_CATEGORY":
            return {...state,categoryTypes: state.categoryTypes.filter(({categoryName})=> categoryName!=payLoad)};
            break;
        case "ADD_CATEGORY":
            return {...state, categoryTypes:state.categoryTypes.includes(payLoad)
                ?state.categoryTypes.filter((categoryName)=> categoryName!==payLoad)
                :[...state.categoryTypes,payLoad]};
            break;

        case "CLEAR_FILTERS":
            return {...state,searchInput:"", sortByRating:"", sortByPrice:"", rangeOfPrice:699,categoryTypes:""}
            break;

        
        default:
            return state;
            break;
    }
}

export function FilterProvider({children}){
    const initialData = {searchInput:"", sortByRating:"", sortByPrice:"", rangeOfPrice:699,categoryTypes:"", cart:[]};
    const [filters, setFilters] = useReducer(filterFunction, initialData);
    return (
        <>
            <FilterContext.Provider value={{filters, setFilters}}>
                {children}
            </FilterContext.Provider>
        </>
    )
} 
