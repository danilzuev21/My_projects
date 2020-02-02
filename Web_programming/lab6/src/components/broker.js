import React, { Component } from 'react';

export default class Broker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: props.name,
			brokers: props.brokers,
			selectedStock: 0,
			selectedAmount: 0
		};
	}

	setAmount = (event) => {
		this.setState({ selectedAmount: parseInt(event.target.value) })
	}

	chooseStock = (id) => {
		console.log(this.state);
		document.getElementById(this.props.stocks[this.state.selectedStock].id).classList.remove('selectedStock');
		let stocks = this.props.stocks;
		for (let i in stocks) {
			if (stocks[i].id === id) {
				document.getElementById(id).classList.add('selectedStock');
				this.setState({ selectedStock: i })
			}
		}
	}

	buy = () => {
		this.props.buy(this.props.name, this.state.selectedStock, this.state.selectedAmount);
	}

	sell = () => {
		this.props.sell(this.props.name, this.state.selectedStock, this.state.selectedAmount);
	}

	render() {
		if (!this.props.stocks)
			return null;
		if (!this.props.brokers)
			return null;
		let broker;
		for (let it of this.props.brokers) {
			if (it.name === this.props.name) {
				broker = it;
			}
		}

		return (
			<div>
				<div>
					<h1>{broker.name}</h1>
					<p>Money: {broker.wealth}</p>
					<div>
						<p>Selected stock: {this.props.stocks[this.state.selectedStock].name} </p>
						Amount of selected stocks:  
						<input type='number' onChange={this.setAmount}/>
						<p>Total price:  {this.props.stocks[this.state.selectedStock].price * this.state.selectedAmount}</p>
					</div>
					<div>
						<button onClick={this.buy}>Buy</button>
						<button onClick={this.sell}>Sell</button>
					</div>
					{this.props.message}
				</div>
				<table id="stock_table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Amount</th>
							<th>Yours</th>
							<th>Distribution</th>
						</tr>
					</thead>
					{this.getRows(broker)}
				</table>
			</div>
		)
	}
	getRows(broker) {
		let tmp = [];
		for (let stock of this.props.stocks) {
			if (stock)
				tmp.push(
					<tr key={stock.id} id={stock.id} className={stock.id === this.props.stocks[0].id ? "selectedStock" : ""} onClick={() => { this.chooseStock(stock.id) }}>
						<td>{stock.name}</td>
						<td>{stock.price}</td>
						<td>{stock.quantity}</td>
						<td>{(broker.stocks && broker.stocks[stock.id]) ? broker.stocks[stock.id] : '-'}</td>
						<td>{stock.distribType}</td>
					</tr>
				);
		}
		return (
			<tbody>{tmp}</tbody>
		)
	}
}
