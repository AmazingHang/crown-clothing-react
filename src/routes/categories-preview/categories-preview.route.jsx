import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

//CategoriesPreview 是一个包含所有种类的路由，承载products
//其中的一个种类包含多个产品
//详细信息在ProductCard中

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {
        //把所有数据依次展现
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      }
    </>
  );
};

export default CategoriesPreview;

//Fragment 组件是 React 中的一个特殊组件，用于在 JSX 中包裹多个子元素，而不会在最终渲染中创建额外的 DOM 节点。它提供了一种灵活的方式来组织 JSX 结构，特别是在不希望引入额外层级或包裹元素时非常有用。
// 使用 Fragment 可以更明确地表达意图，即仅仅是作为一个包裹容器而不会对布局和样式产生影响。
//如果使用 div，则可能会给读者带来误解，认为 div 的引入是有特定目的的，可能会导致不必要的样式调整或布局修改。

/* <Fragment key={title}>
<h2>{title}</h2>
<div className="products-container">
  {
    //注意这里是圆括号，代表return
    categoriesMap[title].map(product => (
      <ProductCard key={product.id} product={product} />
    ))
  }
</div>
</Fragment> */
