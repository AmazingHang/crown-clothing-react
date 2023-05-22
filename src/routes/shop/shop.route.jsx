//Fragment 组件是 React 中的一个特殊组件，用于在 JSX 中包裹多个子元素，而不会在最终渲染中创建额外的 DOM 节点。它提供了一种灵活的方式来组织 JSX 结构，特别是在不希望引入额外层级或包裹元素时非常有用。
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//路由
import CategoriesPreview from "../categories-preview/categories-preview.route";
import Category from "../category/category.route";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

import { setCategories } from "../../store/categories/category.action";

//ShopPage仅是一个路由，承载products
const Shop = () => {
  const dispatch = useDispatch();
  //导入获得的categories数据
  useEffect(() => {
    const getCategoriesMap = async () => {
      //获得数据库中的数据
      const categoriesArray = await getCategoriesAndDocuments();
      //更新程序存储的数据
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
