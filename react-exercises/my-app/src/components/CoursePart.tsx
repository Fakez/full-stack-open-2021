import React from 'react';
import { CoursePartType } from "../types";

const CoursePart = ({name, exerciseCount}: CoursePartType) => {
    return (
      <p>{name} {exerciseCount}</p>)
}

export default CoursePart;