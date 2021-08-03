import React from 'react';

import { CoursePartType } from "../types";
import CoursePart from "./CoursePart";

const Content = ({courseParts}: {courseParts: CoursePartType[]}) => {
    return (
      <div>
        {courseParts.map((part,idx) => <CoursePart key={idx} name={part.name} exerciseCount={part.exerciseCount} />)}
      </div>
    )
}

export default Content;
  