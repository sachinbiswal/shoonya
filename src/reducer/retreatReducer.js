export const initalState = {
  data: [],
  page: 1,
  search: "",
  sortByDate: "",
  sortByType: "",
  types: [],
  allData: [],
  allYears: [],
};

export const retreatReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "LOAD":
      return { ...state, data: value };
    case "SEARCH":
      return { ...state, search: value };
    case "SORT_BY_DATE":
      return { ...state, sortByDate: value};
    case "SORT_BY_TYPE":
      return { ...state, sortByType: value,page:1};
    case "PAGE":
      return { ...state, page: value };
    case "SET_ALL":
      const newTypes = state.types;
      const years = state.allYears;
      value.forEach(({ tag, date }) => {
        const retreatDate = new Date(date * 1000);
        const retreatYear = retreatDate.getUTCFullYear();
        tag.forEach((type) => {
          if (!newTypes.includes(type)) {
            newTypes.push(type);
          }
        });
        if (!years.includes(retreatYear)) {
          years.push(retreatYear);
        }
      });
      return { ...state, allData: value, types: newTypes, allYears: years };
    default:
      return state;
  }
};
