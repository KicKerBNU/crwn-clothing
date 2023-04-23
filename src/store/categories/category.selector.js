//This is just an abstraction of the state.user.currentUser to make it easier to use in other components
export const selectCategoriesMap = (state) => state.categories.categories
    .reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc
    }, {});