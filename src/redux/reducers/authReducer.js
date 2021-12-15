import actionTypes from "../types";

const initialState = {
  rememberMe: false,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload?.user?.email,
        rememberMe: action.payload?.user?.rememberMe,
      };

    case actionTypes.CREATE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };

    // case actionTypes.LOGOUT_SUCCESS:
    //   // return {
    //   //   email: state.rememberMe ? state.email : null,
    //   //   rememberMe: state.rememberMe,
    //   // };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
