import React, { Component } from 'react'
import './Deck.css';
import { createDecipher } from 'crypto';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleCollectionChange.bind(this);
  }

  handleCollectionChange(e) {
    this.props.userCollection.map(card => {
      console.log("card", card)
      return (
        <li>
          <p>{card}</p>
        </li>
      )
    })
  }

  componentDidMount(e) {
    this.handleCollectionChange
  }

  render() {
    return (
      <div className="deck-component">
        <aside className="user-collection">
          <p>Your Collection</p>
          <hr />
          <ul className="user-collection-list">
            {
              this.props.userCollection
            }
          </ul>
        </aside>
      </div>
    )
  }
}
