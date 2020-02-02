import React, { Component } from 'react';

export default class Admin extends Component{
	render(){
		let stocks = this.props.stocks;
		return(
			<div>
				<h1>Admin Page</h1>
					<table>
						<thead>
						<tr>
							<th>Name</th>
							<th>Money</th>
							<th>Stocks</th>
						</tr>
						</thead>
						{BrokersTable(this.props.members)}
					</table>
					<button onClick={this.props.start}>Start auction</button>
					<button onClick={this.props.finish}>Finish auction</button>
			</div>
		)
		function BrokersTableRow(_broker){
			let broker = _broker.broker;
			return(
				<tr>
					<td>{broker.name}</td>
					<td>{broker.wealth}</td>
					<td>{BrokerStocks(broker)}</td>
				</tr>
			)
		}

		function BrokerStocks(broker) {
			if (!broker.stocks)
				return "-";
			let tmp = [];
			for(let i in broker.stocks) {
				if (!broker.stocks[i]) {
					continue;
				}
				let stock;
				for(let j in stocks){
					if(stocks[j].id === Number(i)){
						stock = stocks[j];
						break;
					}
				}
				tmp.push(<p key={i}>{stock.name}: {broker.stocks[i]}</p>)
			}
			if (tmp.length === 0)
				return "-";
			return (<div> {tmp} </div>);
		}

		function BrokersTable(brokers) {
				let rows = [];
				for(let i in brokers){
					rows.push(<BrokersTableRow key={-brokers[i].id} broker={brokers[i]}/>);
				}
				return(
					<tbody>{rows}</tbody>
				)
		}
	}

}
