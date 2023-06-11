import { createSelector } from "reselect";

//只在categories更新时重新渲染,用于提高效率
const selectCategoryRedecer = state => state.categories;

//此函数有记忆性
//第一个参数是输入值，第二个参数是输出值
export const selectCategories = createSelector(
  [selectCategoryRedecer],
  categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories
      //reduce迭代器
      .reduce((acc, category) => {
        //data() : Retrieves all fields in the document as an Object.
        const { items, title } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {})
);
