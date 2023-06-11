//action用于更新数据
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

//用于改变state中user
export const setCurrentUser = user =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
