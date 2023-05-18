//context用于程序内存储数据，方便相应元素调用（类似于内存）
//创建context时，首先引入createContext
import { createContext, useEffect, useState } from "react";

import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: null,
});

//提供改变context的工具，目前仅在配置文件生效
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //用于检查当前用户状态
  useEffect(() => {
    //使用onAuthStateChangeListener函数获得用户状态（跟auth有关）
    const unsubscribe = onAuthStateChangeListener(user => {
      //如果存在auth中存在user，则更新数据库
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //默认设置当前用户
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
