import React, { Component } from 'react';
import Authorization from './components/auth'
import Admin from './components/admin'
import Broker from './components/broker'

import './App.css';
import * as io from 'socket.io-client'
let socket = io('http://localhost');

class App extends Component {
  componentDidMount() {
    this.getInfo();
  }

  state = {
    username: '',
    stocks: null,
    brokers: null,
    settings: null,
    trading: false,
    message: ''
  };

  login = event => {
    event.preventDefault(); // Prevents the page from reloading
    let name = event.target.elements.name.value;
    let b = false;
    if (!this.state.brokers) {
      return;
    }
    for (let it of this.state.brokers) {
      if (it.name === name) {
        b = true;
        break;
      }
    }
    if (!b && name !== "Admin") {
      alert("There's no such user")
      return;
    }

    this.setState({ username: name, message: "" });
    socket.on("connect", () => {
      socket.emit("connected", { "name": this.state.username });
    });
    socket.on('update', (res) => {
      this.setState({
        stocks: res.stocks,
        brokers: res.brokers,
        trading: res.trading
      })
    });
  }

  // Check that there's enough stocks to buy, amount is correct and app is trading
  checkActionAttempt = (stockIndex, amount) => {
    if (!amount || amount <= 0) {
      alert('Incorrect amount')
    }
    if (!this.state.trading) {
      alert('Trade is not started')
      return 0;
    }

    return 1;
  }

  buy = (username, stockIndex, amount) => {
    if (!this.checkActionAttempt(stockIndex, amount))
      return;
    if (this.state.stocks[stockIndex].quantity < amount) {
      alert('Incorrect amount' )
      return;
    }

    let userIndex = null;
    // Get the index of the user
    for (let i in this.state.brokers) {
      if (this.state.brokers[i].name === username) {
        userIndex = i;
        break;
      }
    }

    // Check if broker has enough money for purchasing
    if (this.state.brokers[userIndex].wealth < amount * this.state.stocks[stockIndex].price) {
      alert("You don't have enough money" );
      return;
    }

    this.setState({ message: '' });
    socket.emit('buy', {
      username: username,
      stockID: this.state.stocks[stockIndex].id,
      selectedAmount: amount
    });
  }

  sell = (username, stockIndex, amount) => {
    if (!this.checkActionAttempt(stockIndex, amount))
      return;

    let userIndex = null;
    // Get the index of the user
    for (let i in this.state.brokers) {
      if (this.state.brokers[i].name === username) {
        userIndex = i;
        break;
      }
    }

    let stockID = this.state.stocks[stockIndex].id;
    if (!this.state.brokers[userIndex].stocks
      || !this.state.brokers[userIndex].stocks[stockID]
      || this.state.brokers[userIndex].stocks[stockID] < amount
    ) {
      alert('You don\'t have enough stocks');
      return;
    }

    this.setState({ message: '' });
    socket.emit('sell', {
      username: username,
      stockID: stockID,
      selectedAmount: amount
    });
  }

  start = () => {
    socket.emit('start');
  }
  finish = () => {
    socket.emit('finish');
  }

  getInfo() {
    fetch('http://localhost:80/data/stocks', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => this.setState({ stocks: response }));
    fetch('http://localhost:80/data/brokers', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => this.setState({ brokers: response }));

    fetch('http://localhost:80/data/settings', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => this.setState({ settings: response }));
  }


  render() {
    return (
      <div className="App">
        {this.getContent()}
      </div>
    );
  }

  getContent() {
    let content;
    if (this.state.username === '')
      content = <Authorization
        login={this.login}
      />;
    else if (this.state.username === 'Admin'){
      content = <Admin
        start={this.start}
        finish={this.finish}
        stocks={this.state.stocks}
        members={this.state.brokers}
        setting={this.state.settings}
      />;
    }
    else {
      content = (
        <Broker
          buy={this.buy}
          sell={this.sell}
          name={this.state.username}
          stocks={this.state.stocks}
          brokers={this.state.brokers}
        />
      );
    }
    return content;
  }
}

export default App;
