import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getRoute: ''
    }
  }

  componentDidMount() {
    // @Route 
    axios.get('/api/routes/test').then(res => {
      console.log("Test route called from react client")
      return "Test Route Called"
    }).then(result =>{
      this.setState({getRoute: result})
    })
  }



  render() {
    return (
      <div className="homepage-page">
        <Header />
        Homepage
        <div className="container">
          {this.state.getRoute}
        </div>
      </div>
    )
  }
}
