//Outlet出口允许我们利用模式匹配和嵌套结构，以便根据路由和嵌套动态更改代码部分
//Outlet是子元素的插入位置
//例如 /Home/Shop 可以在父元素的基础上更新界面
//借此可以做出导航
import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
