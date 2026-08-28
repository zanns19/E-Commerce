/**
 * Centralized Product Categories & Subcategories Configuration
 *
 * To add a new top-level category:
 *   Add the category name to CATEGORIES array and update CATEGORY_META in components/CategorySection.js.
 *
 * To add a new Kitchen product type/subcategory:
 *   Simply add the name to KITCHEN_SUBCATEGORIES below.
 */

export const KITCHEN_SUBCATEGORIES = [
  "Hood",
  "Built in HOB",
  "Stove",
  "Built-in Stove",
];

export const CATEGORIES = [
  "Kitchen",
  "Camping Stoves",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export const SUBCATEGORIES = {
  Kitchen: KITCHEN_SUBCATEGORIES,
};

export function getSubcategoriesForCategory(category) {
  return SUBCATEGORIES[category] || [];
}
