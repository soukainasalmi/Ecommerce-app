import actionTypes from "../types";

const initialState = {
  products: [],
  selectedCategories: null,
  favouriteProducts: [],
  cartItems: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        selectedCategories: action.payload.selectedCategories,
      };

    case actionTypes.GET_FAVOURITE_PRODUCT_SUCCESS:
      return {
        ...state,
        favouriteProducts: action.payload.favouriteProducts,
      };

    case actionTypes.ADD_TO_CART_SUCCESS:
      console.log("action.payload.cartItems", action.payload.cartItems);
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case actionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default productReducer;
