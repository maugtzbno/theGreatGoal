import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import UserForm from './Components/UserForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={UserForm}/>
      </Router>
    </div>
  );
}

export default App;
