import { createSelector } from 'reselect';

const selectCategoryReducer = state => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories
);

//This is just an abstraction of the state.user.currentUser to make it easier to use in other components
//This is a memoized selector preventing the component from re-rendering if the state hasn't changed
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {}));