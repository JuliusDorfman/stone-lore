import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceValue: '',
      costValue: '',
      healthValue: '',
      attackValue: '',
      rarityValue: '',
      returnVal: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // @Route Test Route
    axios.get('/api/routes/test').then(result => {
      console.log(result)
    })
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getCard();
  }

  getCard(e) {
    let raceValue = this.state.raceValue;
    let costValue = this.state.costValue;
    axios.get(`/api/routes/races/${raceValue}`).then(res => {
      this.setState({ returnVal: res.data.raceGet }, () => {
        console.log(this.state.returnVal)
      })
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="homepage-page">
        <Header />
        <h1>Homepage</h1>
        <div className="container">
        </div>

        <div className="container form-container">
          <form className="search-form">
            <label htmlFor="raceValue">Race</label>
            <input type="text" name="raceValue" placeholder="e.g. Murloc/Demon/Dragon/ect..." onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="costValue">Cost</label>
            <input type="text" name="costValue" placeholder="Integer" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="healthValue">Health</label>
            <input type="text" name="healthValue" placeholder="Integer" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="attackValue">Attack</label>
            <input type="text" name="attackValue" placeholder="Integer" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="rarityValue">Rarity</label>
            <input type="text" name="rarityValue" placeholder="e.g. Common/Rare/Epic/Legendary" onChange={this.handleChange} autoComplete="off" />
            <hr />
            <button type="submit" name="search" value="Submit" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>

        <div className="container img-container">
          {
            this.state.returnVal
              ?
              <ul className="result-list">
                {this.state.returnVal.map((result, index) => {
                  return (
                    <li>
                      <h4>{result.name}</h4>
                      <img src={result.imgGold} key={result.cardId} alt={result.name} />
                    </li>
                  )
                })
                }
              </ul>
              :
              <span />
          }
        </div>

      </div>
    )
  }
}
