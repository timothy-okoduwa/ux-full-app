import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('');

  return (
    <CourseContext.Provider
      value={{ courseName, setCourseName, category, setCategory }}
    >
      {children}
    </CourseContext.Provider>
  );
};
