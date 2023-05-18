import { createContext, useState } from "react";

import PRODUCTS from "../utils/shop-data.json";

export const ProductsContext = createContext({
  products: [],
});
//通过setProducts可以改变products的值，进而影响放回结果
export const ProductsProvider = ({ children }) => {
  //products是陈列的商品对象
  // eslint-disable-next-line
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
