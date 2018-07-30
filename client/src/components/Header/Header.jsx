import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="hstone-logo"><img src="/assets/images/stairs.svg.png" alt="site-logo"/></div>
          <div className="container">
            <ul className="navbar">
              <li><a href="/">Home</a></li>
              <li><a href="/AboutMe">AboutMe</a></li>
            </ul>
          </div>
        </header>
      </div>
    )
  }
}
