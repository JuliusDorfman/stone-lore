import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header-component">
        <header>
          <a href='/'><img className="hstone-logo" src="/assets/images/hstone-logo.png" alt="site-logo" /></a>
          <ul className="navbar">
            <li className="hstone-logo-add"><a href="/">hStone</a></li>
            {/* <li><a href="/AboutMe">AboutMe</a></li> */}
          </ul>
        </header>
      </div>
    )
  }
}
