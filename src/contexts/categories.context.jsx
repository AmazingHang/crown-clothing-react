import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

//在context中存放数据
export const CategoriesProvider = ({ children }) => {
  //products是陈列的商品对象
  const [categoriesMap, setCategoriesMap] = useState({});

  //用于在第一次在数据库中导入数据
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      //获得数据库中的数据
      const categoriesMap = await getCategoriesAndDocuments();
      //更新程序存储的数据
      setCategoriesMap(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
