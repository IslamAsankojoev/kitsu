import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Pages/Home.jsx';

const Root = () => {
  return (
    <>
      <Router>
        <Route path='/' element={<Home />} />
        <Route path='/anime/:id' element={<></>} />
      </Router>
    </>
  );
};

export default Root;