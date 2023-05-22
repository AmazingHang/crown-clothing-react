import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIS_TYPE } from "./category.types";

export const setCategories = categoriesArray =>
  createAction(CATEGORIS_TYPE.SET_CATEGORIES, categoriesArray);
