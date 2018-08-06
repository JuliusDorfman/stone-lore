import React, { Component } from 'react'
import './Deck.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckCollection: []
    }
  }

  handleCollectionUpdate(props) {
    this.setState({ deckCollection: [...this.state.deckCollection, this.props.userCollection] },
      console.log(this.state.deckCollection)
    )
  }

  render() {
    return (
      <div className="deck-component">
        <aside className="user-collection">
          <p>Your Collection</p>
          <hr />
          <ul className="user-collection-list">
            {this.state.deckCollection}
          </ul>
        </aside>
      </div>
    )
  }
}
