import React, { Component } from 'react'
import Header from '../../components/Header';
import './AboutMe.css';

export default class AboutMe extends Component {
  render() {
    return (
      <div className="aboutme-page">
        <Header />
        <div className="container aboutme-landing-header">
          <h1>About Me</h1>
          <p className="aboutme-landing-intro">To Be Announced!</p>
        </div>

      </div>
    )
  }
}
