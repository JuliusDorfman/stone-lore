import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AboutMe from './pages/AboutMe';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Homepage} />
            <Route path='/AboutMe' component={AboutMe} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


