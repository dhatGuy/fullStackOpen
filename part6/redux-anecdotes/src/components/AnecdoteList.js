import React, { useEffect } from "react";
import { connect} from "react-redux";
import { initializeAnecdotes, voteAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({voteAction, initializeAnecdotes, setNotification, anecdotes, filter}) => {
  useEffect(()=> {
    initializeAnecdotes()
  },[initializeAnecdotes])

  const vote = (anecdote) => {
    voteAction(anecdote)
    setNotification(`You voted '${anecdote.content}'`, 3)
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  initializeAnecdotes,
  voteAction,
  setNotification
}

const mapStateToProps = ({anecdotes, filter}) => {
  if (filter.trim() !== "") {
    anecdotes = anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );

      return {
        anecdotes
      }
  }
  return {
    anecdotes: anecdotes.sort((a, b) => b.votes - a.votes),
    filter
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
