import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//在redux中获得数据
import { selectCategoriesMap } from "../../store/categories/category.selector";
//组件
import ProductCard from "../../components/product-card/product-card.component";
//样式
import { CategoryContainer, CategoryTitle } from "./category.styles.js";

//具体的种类对应的路由
const Category = () => {
  //获得路径中的category参数
  const { category } = useParams();
  //获得程序中的数据
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  //只在路径变化或者数据更新时渲染，在路径中获得距离的category值，并找到对应数组
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle> {category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          //由于获得数据库中的数据需要等待，加载组件时需要确保products已存在
          products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </CategoryContainer>
    </>
  );
};

export default Category;
