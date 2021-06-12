import anecdoteService from "../services/anecdotes";

export const voteAction = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data: updated,
    });
  };
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = (data) => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
    case "CREATE_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
