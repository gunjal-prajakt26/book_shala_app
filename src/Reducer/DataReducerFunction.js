export const initialData = {productData:[],categories:[], cart:[]}; 


 export const DataReducerFun=(state, {type, payLoad})=>{
    switch (type) {
        case "SET_PRODUCT_DATA":
                return {...state, productData:payLoad, data:payLoad };
            break;
        case "SET_CATEGORIES_DATA":
            return {...state, categories:payLoad};
            break;

        case "ADD_TO_CART":
            return {...state.cart,payLoad};
            break;
        default:
            return state;
            break;
    }
}

    