import React from 'react';

const Header = ({courseName}: {courseName: string}) => {
  return (
    <h1>{courseName}</h1>
  )
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map((part,idx) => <CoursePart key={idx} name={part.name} exerciseCount={part.exerciseCount} />)}
    </div>
  )
}

const CoursePart = ({name, exerciseCount}: CoursePart) => {
  return (
    <p>{name} {exerciseCount}</p>)
}

const Total = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;