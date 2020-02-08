import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Welcome from './Components/Welcome'
import UserForm from './Components/UserForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/advance" component={UserForm}/>
      </Router>
    </div>
  );
}

export default App;
