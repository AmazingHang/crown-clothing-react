import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  //获得路径中的category参数
  const { category } = useParams();

  //获得程序中的数据
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  //只在路径变化或者数据更新时渲染，在路径中获得距离的category值，并找到对应数组
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title"> {category.toUpperCase()}</h2>
      <div className="category-container">
        {
          //由于获得数据库中的数据需要等待，加载组件时需要确保products已存在
          products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </>
  );
};

export default Category;
