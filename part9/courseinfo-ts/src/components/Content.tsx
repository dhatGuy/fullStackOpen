import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <Part coursePart={coursePart} />
        </p>
      ))}
    </>
  );
};

export default Content;
