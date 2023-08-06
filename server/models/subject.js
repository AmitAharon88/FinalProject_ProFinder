import { db } from "../config/db.js";

export const getCategories = () => {
    return db("categories")
      .select(
        "category_id",
        "category_name",
      )
      .orderBy("category_name");
};

export const getSubcategories = () => {
  return db("subcategories")
    .select(
      "subcategories.subcategory_id",
      "subcategories.subcategory_name",
      "subcategories.category_id",
      "categoryies.category_name"
    )
    .join("categories", "subcategories.category_id", "=", "categories.category_id")
    .orderBy("subcategory_name");
};
