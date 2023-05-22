import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
//把user放入state
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
