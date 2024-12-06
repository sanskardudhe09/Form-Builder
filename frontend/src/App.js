
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './FormBuilder';
import FormPreview from './FormPreview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/form/:id" element={<FormPreview />} />
      </Routes>
    </Router>
  );
};

export default App;
