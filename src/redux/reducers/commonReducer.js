import actionTypes from "../types";

const initialState = {
  isLoading: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.INDIVIDUAL_MATCH_READING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.PARTNER_MATCH_READING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.PAYMENT_READING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.CREATE_USER_ACCOUNT_SUCCESS:
    case actionTypes.CREATE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default commonReducer;
