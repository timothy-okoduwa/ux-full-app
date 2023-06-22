import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseName1, setCourseName1] = useState('');
  const [category, setCategory] = useState('');
  console.log(category);
  return (
    <CourseContext.Provider
      value={{ courseName1, setCourseName1, category, setCategory }}
    >
      {children}
    </CourseContext.Provider>
  );
};
