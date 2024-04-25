import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import React from 'react';
import Info from './Info';
import Search from './Search';
import './App.css'
 

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="info" element={<Info />} />
        <Route path="*" element={<NoMatch />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
