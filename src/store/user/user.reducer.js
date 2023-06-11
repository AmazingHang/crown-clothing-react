//reducer用于初始化和条件判断
import { USER_ACTION_TYPES } from "./user.types";

const INITIANL_STATE = {
  currentUser: null,
};
//初始化reducer
export const userReducer = (state = INITIANL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      //只改变INITIANL_STATE中的currentUser值
      return { ...state, currentUser: payload };
    default:
      //当与当前状态无关时，则直接返回原状态
      return state;
  }
};
