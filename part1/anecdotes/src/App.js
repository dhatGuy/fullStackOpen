import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [points, setPoints] = useState(new Array(6).fill(0));

  const [selected, setSelected] = useState(0);
  
  const withHighestVote = points.indexOf(Math.max(...points));
  const next = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const vote = (i) => {
    const copy = [...points];
    copy[i]++;
    setPoints(copy);
  };

  return (
    <div>
      <AnecdotesOfTheDay
        anecdotes={anecdotes}
        selected={selected}
        points={points}
      />
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={next}>next anecdote</button>
      <AnecdotesWithHighestVote
        points={points}
        anecdotes={anecdotes}
        withHighestVote={withHighestVote}
      />
    </div>
  );
};

const AnecdotesOfTheDay = ({ anecdotes, selected, points }) => {
  return (
    <section>
      <h1>Anecdotes of the day</h1>
      <p> {anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
    </section>
  );
};

const AnecdotesWithHighestVote = ({ anecdotes, points, withHighestVote }) => {
  return (
    <section>
      <h1>Anecdotes with most votes</h1>
      <p> {anecdotes[withHighestVote]}</p>
      <p>has {points[withHighestVote]} votes</p>
    </section>
  );
};

export default App;
