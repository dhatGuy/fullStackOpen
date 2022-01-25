import React from "react";
import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const render = (part: CoursePart) => {
    switch (part.type) {
      case "normal":
        return (
          <p>
            <i>{part.description} </i>
          </p>
        );
      case "groupProject":
        return <p> project exercises {part.groupProjectCount}</p>;
      case "submission":
        return (
          <p>
            <i>{part.description} </i>
            <p>submit to {part.exerciseSubmissionLink}</p>
          </p>
        );
      case "special":
        return (
          <p>
            <i>{part.description} </i>
            <p>
              skills
              {part.requirements.map((req) => (
                <ul>
                  <li>{req}</li>
                </ul>
              ))}
            </p>
          </p>
        );
      default:
        assertNever(part);
    }
  };
  return <div>{render(coursePart)}</div>;
};

export default Part;
