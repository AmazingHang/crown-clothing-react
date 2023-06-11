import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = store => next => action => {
  if (!action.type) {
    return next(action);
  }
  console.log("type:", action.type);
  console.log("payload:", action.payload);
  console.log("currentstate:", store.getState());
  next(action);
  console.log("next state:", store.getState());
};
//列出中间件
const middlerWares = [loggerMiddleware];
//集成中间件
const composeEnhancers = compose(applyMiddleware(...middlerWares));
//创建redux存储
export const store = createStore(rootReducer, undefined, composeEnhancers);
