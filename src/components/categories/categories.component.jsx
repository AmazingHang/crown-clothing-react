import './categories.styles.scss'
import CategoryItem from '../category-item/category-item.component'

const Categories = ({ categories }) => {
  return (
    <div className='categories-container'>
      {/* 引入 同名变量 时用({}),引入jsx时用{} */}
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Categories
