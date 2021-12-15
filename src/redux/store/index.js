import { createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
// import logger from "redux-logger";

const middleware = applyMiddleware(thunk);

const persistedConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["commonReducer"],
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export { store, persister };
