import React, { Component } from 'react';
import Header from '../../components/Header';
// import Deck from '../../components/Deck';
import axios from 'axios';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeCardListBySet: [],
      standardMetaCardList: '',
      cardNameValue: '',
      raceValue: '',
      costValue: '',
      healthValue: '',
      attackValue: '',
      rarityValue: '',
      setValue: '',
      returnVal: [],
      userCollection: [],
      imgError: "/assets/images/404-creature-hstone-light.png"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
  }

  componentDidMount() {
    // @Desc: Retrieve all cards from Hearthstone API
    axios.get('/api/routes/standardmeta').then(result => {
      this.setState({ completeCardListBySet: result.data.standardMeta }, () => {
        console.log("Complete card list in state: ", this.state.completeCardListBySet)
      })
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() })
    console.log("e.target.name", e.target.name)

  }

  handleSubmit(e) { 
    e.preventDefault();
    this.getCards();
    this.setState({ cardNameValue: "" })
    this.setState({ raceValue: "" })
    this.setState({ costValue: "" })
    this.setState({ healthValue: "" })
    this.setState({ attackValue: "" })
    this.setState({ rarityValue: "" })
    this.setState({ setValue: "" })

    console.log("submit CostValue", this.state.costValue)

    document.getElementById("hstone-search").reset();
    
  }

  handleImageError(e) {
    e.target.className = 'noHover'
  }

  getCards() {
    let completeCardListBySet = this.state.completeCardListBySet;
    let cardNameValue = this.state.cardNameValue;
    let raceValue = this.state.raceValue;
    let costValue = this.state.costValue;
    let healthValue = this.state.healthValue;
    let attackValue = this.state.attackValue;
    let rarityValue = this.state.rarityValue;
    let setValue = this.state.setValue;
    let returnVal = this.state.returnVal;

    console.log("cardNameValue", cardNameValue)
    console.log("raceValue", raceValue)
    console.log("costValue", costValue)
    console.log("healthValue", healthValue)
    console.log("attackValue", attackValue)
    console.log("rarityValue", rarityValue)
    console.log("setValue", setValue)
    console.log("returnVal", returnVal)

    if (returnVal) {
      this.setState({ returnVal: [] })
    }

    for (let nameOfSet in completeCardListBySet) {
      if (completeCardListBySet.hasOwnProperty(nameOfSet)) {
        let singleSet = completeCardListBySet[nameOfSet];

        //@Desc Return a Single Card
        if (cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (cardNameValue === singleCard.name.toLowerCase()) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              })
              )
            }
          })
        }

        //@Desc This will Render a Single Set
        if (nameOfSet && !cardNameValue) {
          if (setValue === nameOfSet.toLocaleLowerCase()) {
            this.setState({ returnVal: singleSet },
              console.log(nameOfSet, singleSet)
            )
          }
        }

        //@Desc This will Render all Races
        if (raceValue && !cardNameValue && !costValue && !healthValue && !attackValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase()) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              })
              )
            }
          })
          console.log("race", this.state.returnVal)
        }

        // @Desc This will Render all Card with value of COSTVALUE
        if (costValue && !cardNameValue && !raceValue && !healthValue && !attackValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            console.log("cost", singleCard.cost)
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
          console.log("cost", this.state.returnVal)
        }

        // @Desc This will Render all Card with value of AttackValue
        if (attackValue && !cardNameValue && !raceValue && !costValue && !healthValue) {
          singleSet.forEach((singleCard, index) => {
            console.log("attack", singleCard.attack)
            if (parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
          console.log("attackValue", this.state.returnVal)
        }

        // @Desc This will Render all Card with value of HealthValue
        if (healthValue && !cardNameValue && !raceValue && !costValue && !attackValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            console.log("health", singleCard.health)
            if (parseInt(healthValue, 10) === parseInt(singleCard.health, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
        }

        // @Desc This will Render all Card with value of rarityValue
        if (rarityValue && !cardNameValue && !raceValue && !costValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.rarity === undefined) {
              return null
            }
            console.log("rarity", singleCard.rarity)
            if (rarityValue === singleCard.rarity.toLowerCase()) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
        }

        // @Desc This will Render all Cards with value of raceValue && cardValue
        if (raceValue && costValue && !cardNameValue && !attackValue && !healthValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.cost === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase() && parseInt(costValue, 10) === parseInt(singleCard.cost, 10)) {
              console.log(singleCard.race + " " + singleCard.cost)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & cost", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of raceValue && healthValue
        if (raceValue && healthValue && !cardNameValue && !costValue && !attackValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.health === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase() && parseInt(healthValue, 10) === parseInt(singleCard.health, 10)) {
              console.log(singleCard.race + " " + singleCard.health)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & health", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of raceValue && attackValue
        if (raceValue && attackValue && !cardNameValue && !costValue && !healthValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase() && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              console.log(singleCard.race + " " + singleCard.attack)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & attack", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of raceValue && rarityValue
        if (raceValue && rarityValue && !cardNameValue && !costValue && !attackValue && !healthValue) {
          console.log(raceValue)
          console.log(rarityValue)
          console.log(cardNameValue)
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.rarity === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase() && rarityValue.toLowerCase() === singleCard.rarity.toLowerCase()) {
              console.log(singleCard.race + " " + singleCard.rarity)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & rarity", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of costValue && healthValue
        if (costValue && healthValue && !raceValue && !attackValue && !rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.health === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && parseInt(healthValue, 10) === parseInt(singleCard.health, 10)) {
              console.log(singleCard.cost + "ok" + singleCard.health)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & health", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of costValue && attackValue
        if (costValue && attackValue && !healthValue && !raceValue && !rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              console.log(singleCard.cost + "ok" + singleCard.attack)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & attack", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of costValue && raceValue
        if (costValue && raceValue && !healthValue && !attackValue && !rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.race === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && raceValue === singleCard.race.toLowerCase()) {
              console.log(singleCard.cost + "ok" + singleCard.race)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & race", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of healthValue && attackValue
        if (healthValue && attackValue && !costValue && !raceValue && !rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.health === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (parseInt(healthValue, 10) === parseInt(singleCard.health, 10) && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              console.log(singleCard.health + "ok" + singleCard.attack)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & attack", this.state.returnVal)
        }


        // @Desc This will Render all Cards with value of healthValue && rarityValue
        if (costValue && rarityValue && !healthValue && !raceValue && !attackValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.rarity === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && rarityValue.toLowerCase() === singleCard.rarity.toLowerCase()) {
              console.log(singleCard.cost + "ok" + singleCard.rarity)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & rarity", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of healthValue && attackValue
        if (healthValue && attackValue && !rarityValue && !raceValue && !costValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.health === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (parseInt(healthValue, 10) === parseInt(singleCard.health, 10) && parseInt(attackValue, 10) === parseInt(singleCard.attackattackValue, 10)) {
              console.log(singleCard.health + "ok" + singleCard.attack)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & attack", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of costValue && healthValue && attackValue
        if (costValue && healthValue && attackValue && !rarityValue && !raceValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.health === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && parseInt(healthValue, 10) === parseInt(singleCard.health, 10) && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              })
              )
            }
          })
        }

        // @Desc This will Render all Cards with value of raceValue && costValue && healthValue && attackValue
        if (costValue && healthValue && attackValue && raceValue && !rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.health === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (singleCard.race === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10) && parseInt(healthValue, 10) === parseInt(singleCard.health, 10) && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10) && raceValue === singleCard.race.toLowerCase()) {
              console.log(singleCard.health + " " + singleCard.attack + " " + singleCard.cost + " " + singleCard.race)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & cost & attack & race", this.state.returnVal)
        }

        // @Desc This will Render all Cards with value of raceValue && costValue && healthValue && attackValue && rarityValue
        if (costValue && healthValue && attackValue && raceValue && rarityValue && !cardNameValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.cost === undefined) {
              return null
            }
            if (singleCard.health === undefined) {
              return null
            }
            if (singleCard.attack === undefined) {
              return null
            }
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.rarity === undefined) {
              return null
            }
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10)
              && parseInt(healthValue, 10) === parseInt(singleCard.health, 10)
              && parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)
              && raceValue === singleCard.race.toLowerCase()
              && rarityValue === singleCard.rarity.toLowerCase()
            ) {
              console.log(singleCard.health + " " + singleCard.attack + " " + singleCard.cost + " " + singleCard.race + " " + singleCard.rarity)
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & cost & attack & race", this.state.returnVal)
        }
      }
    }
  }

  handleClick(e) {
    let selectedCard = e.target;
    this.setState({ userCollection: [...this.state.userCollection, selectedCard.getAttribute("cardname")] }, () =>
      console.log(this.state.userCollection)
    )
  }

  render() {
    return (
      <div className="homepage-page">

        <Header />
        <div className="deck-component">
          <aside className="user-collection">
            <p>Your Collection</p>
            <hr />
            <ul className="user-collection-list">
              {this.state.userCollection.map((card, index) => {
                return (
                  <li
                    key={card + index}
                  >
                    <p>{card}</p>
                  </li>
                )
              })}
            </ul>
            <div className="card-count">
              <hr />
              <p>Cards: {this.state.userCollection.length}/30</p>
            </div>
          </aside>
        </div>

        <div className="container homepage-landing-header">
          <h1>Homepage</h1>
          <p className="homepage-landing-intro">Crush your Addiction</p>
        </div>

        <div className="container">
          <p>1. Search (leave "CARD NAME" value blank for multiple results)</p>
          <p>2. Choose 30 cards</p>
          <p>3. </p>
        </div>

        <div className="container form-container">
          <form id="hstone-search" className="search-form">
            <label htmlFor="cardNameValue">Card Name</label>
            <input type="text" name="cardNameValue" placeholder="e.g Emeriss, Woecleaver, Hogger " value={this.state.cardNameValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="raceValue">Race</label>
            <input type="text" name="raceValue" placeholder="e.g. Murloc/Demon/Dragon/ect..." value={this.state.raceValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="costValue">Cost</label>
            <input type="number" name="costValue" placeholder="Integer" value={this.state.costValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="healthValue">Health</label>
            <input type="number" name="healthValue" placeholder="Integer" value={this.state.healthValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="attackValue">Attack</label>
            <input type="number" name="attackValue" placeholder="Integer" value={this.state.attackValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="rarityValue">Rarity</label>
            <input type="text" name="rarityValue" placeholder="e.g. Common/Rare/Epic/Legendary" value={this.state.rarityValue} className="form-values" onChange={this.handleChange} autoComplete="off" />
            <label htmlFor="setValue">Set</label>
            <select name="setValue" placeholder="Optional" value={this.state.setValue} className="form-values" onChange={this.handleChange}>
              <option placeholder="Optional">Optional</option>
              <option value="Basic">Basic</option>
              <option value="Classic">Classic</option>
              <option value="Journey to Un'Goro">Journey to Un'Goro</option>
              <option value="Knights of the Frozen Throne">Knights of the Frozen Throne</option>
              <option value="Kobolds & Catacombs">Kobolds & Catacombs</option>
              <option value="The Witchwood">The Witchwood</option>
              <option value="The Boomsday Project">The Boomsday Project</option>
            </select>
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
                    <li key={result.name + index}>
                      <h4>{result.name}</h4>
                      {
                        <img
                          src={result.img ? result.img : this.state.imgError}
                          key={result.cardId + index}
                          alt={result.name}
                          cardname={result.name}
                          race={result.race}
                          cost={result.cost}
                          health={result.health}
                          attack={result.attack}
                          rarity={result.rarity}
                          set={result.cardSet}
                          onClick={this.handleClick}
                          onError={(e) => {
                            this.handleImageError(e)
                            e.target.src = this.state.imgError;
                          }
                          } />
                      }
                      <p>Set: {result.cardSet}</p>
                      <p>Rarity: {result.rarity ? result.rarity : "Non Collectable"}</p>
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
