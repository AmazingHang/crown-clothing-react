import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";
//ShopPage仅是一个路由，承载products
const Shop = () => {
  //读取context中products的值
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {
        //注意这里是圆括号，代表return
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
};

export default Shop;
