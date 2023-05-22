//context用于程序内存储数据，方便相应元素调用（类似于内存）
//创建context时，首先引入createContext
import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
});

//用变量的形式避免人为错误
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      //只改变符合的状态
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIANL_STATE = {
  currentUser: null,
};

//提供改变context的工具，目前仅在配置文件生效
export const UserProvider = ({ children }) => {
  //useReducer接受两个参数，一个是设置，一个是初始值
  //从state中取出currentUser
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIANL_STATE);

  const value = { currentUser };

  //用于检查当前用户状态
  useEffect(() => {
    //使用onAuthStateChangeListener函数获得用户状态（跟auth有关）
    const unsubscribe = onAuthStateChangeListener(user => {
      //如果存在auth中存在user，则更新数据库
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //默置当前用户
      dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
