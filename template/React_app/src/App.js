import React from 'react';
import Login from './page/login';
import Widget from './page/widget';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route path='/widget' element={<Widget />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
