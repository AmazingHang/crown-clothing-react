//PS:在index.js里首先引入react-router-dom
//引用路由后，需要改变index.js，写成 <BrowserRouter><App /></BrowserRouter>
import { Routes, Route } from "react-router-dom";

import Navigation from "../src/routes/navigation/navigation.route";
import Home from "../src/routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route";
import Shop from "./routes/shop/shop.route";
import Checkout from "./routes/checkout/checkout.route";

const App = () => {
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
