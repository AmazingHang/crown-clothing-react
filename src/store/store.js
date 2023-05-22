import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//列出中间件
const middlerWares = [logger];
//集成中间件
const composeEnhancers = compose(applyMiddleware(...middlerWares));
//创建redux存储
export const store = createStore(rootReducer, undefined, composeEnhancers);
