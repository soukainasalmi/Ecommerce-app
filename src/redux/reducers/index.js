import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import commonReducer from "./commonReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  commonReducer,
  productReducer,
});

export default rootReducer;
