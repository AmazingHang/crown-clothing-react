//PS:在index.js里首先引入react-router-dom
//引用路由后，需要改变index.js，写成 <BrowserRouter><App /></BrowserRouter>
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user.action";

//路由指向的组件
import Navigation from "../src/routes/navigation/navigation.route";
import Home from "../src/routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route";
import Shop from "./routes/shop/shop.route";
import Checkout from "./routes/checkout/checkout.route";

//在public中设置_redirects来解决netlify的重定向未找到网页问题

const App = () => {
  //用于派发信息改变state
  const dispatch = useDispatch();
  //导入获得的user数据
  useEffect(() => {
    //使用onAuthStateChangeListener函数获得用户状态（跟auth有关）
    const unsubscribe = onAuthStateChangeListener(user => {
      //如果存在auth中存在user，则更新数据库
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //默置当前用户
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};
//default 关键字用于指定模块的默认导出，并允许在导入时使用任意的名称引用默认导出的内容。
export default App;
