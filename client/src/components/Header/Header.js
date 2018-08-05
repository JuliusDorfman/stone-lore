import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header-component">
        <header>
          <div className="hstone-logo"><a href='/'><img src="/assets/images/hstoneconceptlogo.png" alt="site-logo"/></a></div>
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
