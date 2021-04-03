import React, { useState } from "react";

const Statistic = ({ text, value }) => {
  return (
    <div>
      <tr>
        <td>{text}</td>
        <td> {value}</td>
      </tr>
    </div>
  );
};

const Statistics = ({ good, bad, neutral }) => {

  if (good + bad + neutral === 0) {
    return <p>No feedback given</p>
  }
    return (
      <table>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + bad + neutral} />
        <Statistic
          text="average"
          value={(good - bad) / (good + bad + neutral) || 0}
        />
        <Statistic
          text="positive"
          value={`${(good / (good + bad + neutral)) * 100 || 0} %`}
        />
      </table>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button onClick={() => setGood((prev) => prev + 1)}>good</button>
        <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
        <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      </div>
<h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
