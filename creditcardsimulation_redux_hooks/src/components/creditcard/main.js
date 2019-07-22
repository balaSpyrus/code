import React, { Component } from 'react';
import { AddCard, CardList } from './';
import Axios from 'axios';
import { encryptCard } from './cardUtil';


class Main extends Component {
  state = {
    creditCards: []
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = async () => {

    try {
      let response = await Axios.get('/card/getCards')
      this.setState({
        creditCards: response.data
      })

    } catch (error) {
      console.log(error);
    }
  }

  addEntry = (data) => {
    this.setState(prevState => ({
      creditCards: prevState.creditCards.concat(data)
    }))
  }

  deleteCard = async (cardNum) => {
    try {
      let response = await Axios.get(`/card/delete/${encryptCard(cardNum)}`)
      console.log(response.data.msg);
      this.setState((prevState) => ({
        creditCards: prevState.creditCards.filter(card => card.number !== cardNum)
      }))
    } catch (error) {
      console.log(error);
    };

  }

  render() {
    return (
      <>
        <CardList creditCards={this.state.creditCards} onDelete={this.deleteCard} />
        <AddCard creditCards={this.state.creditCards} addEntry={this.addEntry} />
      </>

    );
  }
}

export default Main;

