import React, { Component } from 'react';
import Header from '../../components/Header';
// import Deck from '../../components/Deck';
import axios from 'axios';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: false,
      showInstructions: false,
      showForm: true,
      showDeckValues: true,
      showUserCollection: true,
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
      userDeck: [],
      userCalculationsArray: [],
      winRateCalculate: '',
      dollarValueCalculate: '',
      imgError: "/assets/images/404-creature-hstone-light.png",
      minimumMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShowInstructions = this.handleShowInstructions.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleShowDeckValues = this.handleShowDeckValues.bind(this);
    this.handleShowUserCollection = this.handleShowUserCollection.bind(this);
    this.handleCollectionReset = this.handleCollectionReset.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.removeItemFromUserCollection = this.removeItemFromUserCollection.bind(this);
  }

  componentDidMount() {
    this.setState({ loadingData: true })
    // @Desc: Retrieve all cards from Hearthstone API
    axios.get('/api/routes/standardmeta').then(result => {
      this.setState({ completeCardListBySet: result.data.standardMeta }, () => {
        console.log("Complete card list in state: ", this.state.completeCardListBySet)
        this.setState({ loadingData: false })
      })
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() })
  }

  handleCollectionReset(e) {
    this.setState({ returnVal: [] });
    this.setState({ userCollection: [] });
    this.setState({ userDeck: [] });
    this.setState({ userCalculationsArray: [] });
  }

  handleCollectionSubmit(e) {
    console.log("this.state.userCollection", this.state.userCollection)
    this.setState({ userDeck: this.state.userCollection }, () => {
      console.log("userdeck", this.state.userDeck)
      this.setState({ returnVal: [] })

      if (this.state.userDeck.length >= 10) {
        let tempCalculationsArray = []
        this.state.userDeck.map((individualUserDeckCard, index) => {
          console.log("individualUserDeckCard", individualUserDeckCard)

          if (!individualUserDeckCard.getAttribute('rarity') || individualUserDeckCard.getAttribute('rarity').toLocaleLowerCase() === "free" || individualUserDeckCard.getAttribute('rarity') === null || individualUserDeckCard.getAttribute('rarity') === undefined) {
            tempCalculationsArray.push({
              "rarityCalculation": 0,
              "valueCalculation": 0
            })
          } else if (individualUserDeckCard.getAttribute('rarity').toLowerCase() === "common") {
            tempCalculationsArray.push({
              "rarityCalculation": 1,
              "valueCalculation": Math.floor(Math.random() * (25 - 1) + 1)
            })
          } else if (individualUserDeckCard.getAttribute('rarity').toLowerCase() === "rare") {
            tempCalculationsArray.push({
              "rarityCalculation": 2,
              "valueCalculation": Math.floor(Math.random() * (50 - 25) + 25)
            })
          } else if (individualUserDeckCard.getAttribute('rarity').toLowerCase() === "epic") {
            tempCalculationsArray.push({
              "rarityCalculation": 3,
              "valueCalculation": Math.floor(Math.random() * (75 - 50) + 50)
            })
          } else if (individualUserDeckCard.getAttribute('rarity').toLowerCase() === "legendary") {
            tempCalculationsArray.push({
              "rarityCalculation": 4,
              "valueCalculation": Math.floor(Math.random() * (100 - 75) + 75)
            })
          }
          return tempCalculationsArray
        })

        this.setState({ userCalculationsArray: tempCalculationsArray }, () => {
          this.getWinrate();
          this.getDollarValue();
        })

        this.setState({ minimumMessage: '' })

      } else {
        const minimumRequired = <div className="minimum-warning">Please enter a minimum of 10 cards.</div>
        return this.setState({
          minimumMessage: minimumRequired
        })
      }
    })

  }

  removeItemFromUserCollection(e) {
    console.log("Todo: remove individual cards via clicking userCollection")
    // let temporaryUserCollection = [this.state.userCollection];
    // let selectedCardToRemove = e.target.innerHTML
    // console.log("temporaryUserCollection", temporaryUserCollection)
    // this.state.userCollection.forEach((collectionItem, index) => {
    //   console.log("collectionItem", collectionItem)
    //   if (collectionItem.getAttribute('cardname') === e.target.innerHTML) {
    //     temporaryUserCollection = temporaryUserCollection.splice(0, 1, "TESTING", "TESTING")
    //     console.log("match", temporaryUserCollection)
    //     return temporaryUserCollection;
    //   } else {
    //     console.log("nomatch", temporaryUserCollection)
    //   }
    // })
    // this.setState({userCollection: [temporaryUserCollection]})
    // console.log("userCollection", this.state.userCollection)
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
          console.log("race")
        }

        // @Desc This will Render all Card with value of COSTVALUE
        if (costValue && !cardNameValue && !raceValue && !healthValue && !attackValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            if (parseInt(costValue, 10) === parseInt(singleCard.cost, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
          console.log("cost")
        }

        // @Desc This will Render all Card with value of AttackValue
        if (attackValue && !cardNameValue && !raceValue && !costValue && !healthValue) {
          singleSet.forEach((singleCard, index) => {
            if (parseInt(attackValue, 10) === parseInt(singleCard.attack, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
          console.log("attackValue")
        }

        // @Desc This will Render all Card with value of HealthValue
        if (healthValue && !cardNameValue && !raceValue && !costValue && !attackValue && !rarityValue) {
          singleSet.forEach((singleCard, index) => {
            if (parseInt(healthValue, 10) === parseInt(singleCard.health, 10)) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("healthValue")
        }

        // @Desc This will Render all Card with value of rarityValue
        if (rarityValue && !cardNameValue && !raceValue && !costValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.rarity === undefined) {
              return null
            }
            if (rarityValue === singleCard.rarity.toLowerCase()) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }
              ))
            }
          })
          console.log("rarityValue")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & cost")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & health")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & attack")
        }

        // @Desc This will Render all Cards with value of raceValue && rarityValue
        if (raceValue && rarityValue && !cardNameValue && !costValue && !attackValue && !healthValue) {
          singleSet.forEach((singleCard, index) => {
            if (singleCard.race === undefined) {
              return null
            }
            if (singleCard.rarity === undefined) {
              return null
            }
            if (raceValue === singleCard.race.toLowerCase() && rarityValue.toLowerCase() === singleCard.rarity.toLowerCase()) {
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("race & rarity")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & health")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & attack")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & race")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & attack")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("cost & rarity")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & attack")
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
              this.setState(prevState => ({
                returnVal: [...prevState.returnVal, singleCard]
              }))
            }
          })
          console.log("health & cost & attack & race")
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

  getWinrate() {
    // TODO: Make Actual Winrate Calculator using *in-meta deck comparison to user collection*
    let winRateCalculate = (100 / (Math.random() * (80 - 75) + 75)).toString().slice(2, 4)
    return this.setState({ winRateCalculate: winRateCalculate })
  }

  getDollarValue() {
    let dollarVal = '';
    this.state.userCalculationsArray.map((cardObject, index) => {
      console.log("cardObject.rarityCalculation", cardObject.rarityCalculation)
      return cardObject.rarityCalculation
    }).reduce((sum, prev) => {
      dollarVal = Number.parseFloat(sum + prev * Math.random() * (.5 + .1) + .1).toFixed(2)
      this.setState({ dollarValueCalculate: dollarVal })
      return dollarVal
    })
  }

  handleShowInstructions(e) {
    let instructionsElement = document.getElementsByClassName('instructions-detail')[0];
    if (this.state.showInstructions === false) {
      this.setState({ showInstructions: true })
    } else {
      this.setState({ showInstructions: false })
    }

    if (this.state.showInstructions) {
      instructionsElement.style.display = "none";
    } else {
      instructionsElement.style.display = "inline";
    }
  }

  handleShowForm(e) {
    let formElement = document.getElementById('hstone-search');
    if (this.state.showForm === false) {
      this.setState({ showForm: true })
    } else {
      this.setState({ showForm: false })
    }

    if (this.state.showForm) {
      formElement.style.display = "none";
    } else {
      formElement.style.display = "grid";
    }
  }

  handleShowDeckValues(e) {
    let formElement = document.getElementsByClassName('values-display-wrapper')[0];
    if (this.state.showForm === false) {
      this.setState({ showForm: true })
    } else {
      this.setState({ showForm: false })
    }

    if (this.state.showForm) {
      formElement.style.display = "none";
    } else {
      formElement.style.display = "inline-block";
    }
  }

  handleShowUserCollection(e) {
    console.log("showUserCollcetion")
    let formElement = document.getElementsByClassName('user-collection-show')[0];
    if (this.state.showForm === false) {
      this.setState({ showForm: true })
    } else {
      this.setState({ showForm: false })
    }

    if (this.state.showForm) {
      formElement.style.display = "none";
    } else {
      formElement.style.display = "grid";
    }
  }

  handleClick(e) {
    let selectedCard = e.target;
    console.log("selectedCard", selectedCard)
    if (this.state.userCollection.length >= 30) {
      return null
    }
    this.setState({ userCollection: [...this.state.userCollection, selectedCard] }, () =>
      console.log("userCollection", this.state.userCollection)
    )
  }

  render() {
    return (
      <div className="homepage-page">

        <Header />
        <div className="deck-component">
          <div className="user-collection">
            <p>Deck Tracker</p>
            <ul className="user-collection-list">
              {this.state.userCollection.map(
                (card, index) => {
                  return (
                    <li
                      className="user-collection-list-item"
                      key={card.getAttribute('cardname') + index}
                      onClick={this.removeItemFromUserCollection}
                    >
                      <p>{card.getAttribute('cardname')}</p>
                    </li>
                  )
                }
              )}
            </ul>
            <div className="card-count">
              <p>Cards: {this.state.userCollection.length}/30</p>
              <div className="user-collection-button">
                <img className="hearthstone-button-image" src="/assets/images/hearthstone-button-template.png" alt="button" />
                <button onClick={this.handleCollectionSubmit}>Submit</button>
              </div>
              <div className="user-collection-button">
                <img className="hearthstone-button-image" src="/assets/images/hearthstone-button-template.png" alt="button" />
                <button onClick={this.handleCollectionReset}>Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container homepage-landing-header">

          <div className="instructions">
            <span
              className="show-button"
              onClick={this.handleShowInstructions}>
              +
            </span>
            <h4
              onClick={this.handleShowInstructions}
            >
              &nbsp;&nbsp;&nbsp;Instructions
          </h4>
            <span className="instructions-detail">
              <p>1. Search (No required fields)</p>
              <p>2. Choose a minimum of 10 cards</p>
              <p>3. Click Submit button at bottom of Deck Tracker</p>
            </span>
          </div>

          <h1>hStone</h1>
          <p className="homepage-landing-intro">Crush your Hearthstone Addiction</p>
        </div>
        {
          this.state.loadingData
            ?
            <div className="loading-component">
              <p>Loading (Up to 30 seconds)</p>
              <img className="loading-spinner" src="/assets/images/loading-spinner.png" alt="site-logo" style={{ height: "150px", width: "150px" }} />
            </div>
            :
            <div className="info-container">
              <div className="form-container">
                <span
                  className="show-button"
                  onClick={this.handleShowForm}>
                  +
                  </span>
                <h4
                  onClick={this.handleShowForm}
                >
                  &nbsp;&nbsp;&nbsp;Card Search
                </h4>
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
                    <option value="The Witchwood">The Witchwood</option>
                    <option value="The Boomsday Project">The Boomsday Project</option>
                    <option value="Rastakhan's Rumble">Rastakhan's Rumble</option>
                    <option value="Rise of Shadows">Rise of Shadows</option>
                  </select>
                  <div />
                  <span className="form-button">
                    <img className="hearthstone-button-image" src="/assets/images/hearthstone-button-template.png" alt="button" />
                    <button className="search-criteria-submit" type="submit" name="search" value="Submit" onClick={this.handleSubmit}>Search</button>
                  </span>
                </form>
              </div>

              <div className="hstone-picture-wrapper">
                <img src="/assets/images/murloc.png" alt="hstone-murloc" />
              </div>

              <span>
                {
                  this.state.userCalculationsArray.length !== 0 ?

                    <div className="values-container">
                      <span
                        className="show-button"
                      >
                        +
                      </span>
                      <h1
                        onClick={this.handleShowDeckValues}>
                        &nbsp;&nbsp;&nbsp;Deck Values</h1>
                      <span className="values-display-wrapper">
                        <div className="value-wrapper">
                          <h2>hStone Value: {
                            this.state.userCalculationsArray.map((cardObject, index) => {
                              return cardObject.valueCalculation
                            }).reduce((sum, prev) => {
                              return (
                                sum + prev
                              )
                            })
                          }</h2>
                        </div>

                        <div className="value-wrapper">
                          <h2>Dollar Value: ${
                            this.state.dollarValueCalculate
                          }</h2>
                        </div>

                        <div className="value-wrapper">
                          <h2>Win Rate Value: {
                            this.state.winRateCalculate
                          }%</h2>
                        </div>

                        <div className="value-wrapper">
                          <h2>Rarity Value: {
                            this.state.userCalculationsArray.map((cardObject, index) => {
                              return cardObject.rarityCalculation
                            }).reduce((sum, prev) => {
                              return (sum + prev)
                            })
                          }</h2>
                        </div>
                      </span>
                    </div>
                    :
                    <span />
                }
              </span>
            </div>
        }

        <div className="container">
          {this.state.minimumMessage}
        </div>
        <div className="container img-container ">
          {
            this.state.userDeck.length !== 0
              ?
              <div className="results-your-collection-container">
                <span
                  className="show-button"
                  onClick={this.handleShowUserCollection}>
                  +
                  </span>
                <h4 className="collection-title"
                  onClick={this.handleShowUserCollection}
                >
                  &nbsp;&nbsp;&nbsp;Your Collection
                  </h4>
                <ul className="result-list user-collection-show">
                  {
                    this.state.userDeck.map((result, index) => {
                      return (
                        <li key={result.name + index}>
                          <h4>{result.name}</h4>
                          {
                            <img
                              src={result.src ? result.src : this.state.imgError}
                              key={result.cardId + index}
                              alt={result.getAttribute('alt')}
                              cardname={result.getAttribute('cardname')}
                              race={result.getAttribute('race')}
                              cost={result.getAttribute('cost')}
                              health={result.getAttribute('health')}
                              attack={result.getAttribute('attack')}
                              rarity={result.getAttribute('rarity')}
                              set={result.getAttribute('cardSet')}
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
              </div>
              :
              <span />
          }
          {
            this.state.returnVal.length !== 0
              ?
              <div className="results-container">
                <h4 className="search-results-title">&nbsp;&nbsp;&nbsp;Search Results</h4>
                <ul className="result-list">
                  {
                    this.state.returnVal.map((result, index) => {
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
              </div>
              :
              <span />
          }
        </div>

      </div>
    )
  }
}
