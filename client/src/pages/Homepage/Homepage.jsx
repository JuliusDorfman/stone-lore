import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testRoute: '',
      submitVal: '',
      returnVal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // @Route 
    axios.get('/api/routes/test').then(res => {
      console.log("Test route called from react client")
      return "Test Route Called"
    }).then(result => {
      this.setState({ testRoute: result })
    })
  }


  handleChange(e) {
    this.setState({ submitVal: e.target.value })
  }

  handleSubmit(e) {
    console.log(`e\xa0` + this.state.submitVal)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(`e\xa0` + this.state.submitVal)
      this.getCard()
    }
  }

  getCard(e) {
    let card = this.state.submitVal;
    axios.get('/api/routes/murloc').then(res => {
      this.setState({ returnVal: res.data }, ()=> {
        console.log(this.state.returnVal)
      })
    })
  }

  render() {
    return (
      <div className="homepage-page">
        <Header />
        Homepage
        <div className="container">
          {this.state.testRoute}
        </div>
        <input type="text" name="search" placeholder="card" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type="submit" name="search" value="submit" onClick={this.handleSubmit} />
        {/* {this.state.returnVal} */}
      </div>
    )
  }
}
