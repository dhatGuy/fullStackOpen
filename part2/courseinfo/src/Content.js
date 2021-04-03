import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises }, i) => (
        <Part key={i} part={name} exercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
