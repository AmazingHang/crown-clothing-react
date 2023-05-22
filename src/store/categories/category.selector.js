export const selectCategoriesMap = state =>
  state.categories.categories
    //reduce迭代器
    .reduce((acc, category) => {
      //data() : Retrieves all fields in the document as an Object.
      const { items, title } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
