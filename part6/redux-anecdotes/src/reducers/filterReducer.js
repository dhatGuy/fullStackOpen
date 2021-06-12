const filterReducer = (state="", action) => {
  if(action.type === "FILTER"){
    return action.data;
  }
  return state
}

export const addFilter = (keyword) => {
  return {
    type: "FILTER",
    data: keyword
  }
}

export default filterReducer;
