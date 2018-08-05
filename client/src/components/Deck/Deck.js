import React, { Component } from 'react'
import './Deck.css';

export default class Deck extends Component {
  render() {
    return (
      <div className="deck-component">
        <aside className="user-collection">
          <p>Your Collection</p>
          <hr />
        </aside>
      </div>
    )
  }
}
