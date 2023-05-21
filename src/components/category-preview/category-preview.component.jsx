import { Link } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import "./category-preview.style.scss";

//在categories中使用的组件
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {
          // 筛选出前四个元素，并以卡片形式呈现
          products
            .filter((_, idx) => idx < 4)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default CategoryPreview;
