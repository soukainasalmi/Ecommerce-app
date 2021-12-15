import actionTypes from "../types";

const initialState = {
  user: null,
  notifications: null,
  payments: [],
  graphData: [],
  paymentCards: [],
  favourites: [],
  deliveryAddress: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload?.user,
      };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload?.user,
      };

    case actionTypes.ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        user: action.payload?.user,
      };

    case actionTypes.GET_NOTICATION_SETTING_ERROR:
    case actionTypes.GET_NOTICATION_SETTING_SUCCESS:
      return {
        ...state,
        notifications: action.payload?.notifications,
      };

    case actionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.ADD_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        paymentCards: action.payload?.paymentCards,
      };

    case actionTypes.REMOVE_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        paymentCards: action.payload?.paymentCards,
      };
    case actionTypes.ADD_PAYMENT:
      return {
        ...state,
        payments: action.payload?.payments,
      };
    case actionTypes.CHANGE_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        deliveryAddress: action.payload?.deliveryAddress,
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

export default userReducer;
