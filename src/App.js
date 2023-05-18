//PS:在index.js里首先引入react-router-dom
//引用路由后，需要改变index.js，写成 <BrowserRouter><App /></BrowserRouter>
import { Routes, Route } from "react-router-dom";

import Navigation from "../src/routes/navigation/navigation.route";
import Home from "../src/routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route";
import Shop from "./routes/shop/shop.route";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
