/** @format */

//Outlet出口允许我们利用模式匹配和嵌套结构，以便根据路由和嵌套动态更改代码部分
//Outlet是子元素的插入位置
//例如 /Home/Shop 可以在父元素的基础上更新界面
//借此可以做出导航
import { Outlet } from "react-router-dom";

import Categories from "../../components/categories/categories.component";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "women",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];
  return (
    <div>
      <Outlet />
      <Categories categories={categories} />
    </div>
  );
};

export default Home;
