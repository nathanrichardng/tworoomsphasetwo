import React from 'react';
import List from '../components/List.jsx';

class WaitingOnPlayerList extends React.Component {

	constructor() {
		super();
		this.getRequiredPlayers = this.getRequiredPlayers.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.itemStyle = {
			backgroundColor: "#C8D8EB",
			color: "#333"
		}
	}

	getRequiredPlayers() {
		const selectedCardCount = this.props.selectedCards.length;
		const playerCount = this.props.players.length;
		const diff = selectedCardCount + 2 - playerCount;
		const requiredPlayers = (diff > 0) ? diff : 0;
		console.log("requiredPlayers", requiredPlayers);
		return requiredPlayers;
	}

	//TODO add method that will create array of required players and render them.
	renderItems() {
		const requiredPlayers = this.getRequiredPlayers();
		const items = [];
		for(let i = 0; i < requiredPlayers; i++) {
			items.push(
				<li className="list-group-item" key={i} style={this.itemStyle}>
					Waiting on player...
				</li>
			);
		}
		return items;
	}

	render() {
		return (
			<ul className="list-group">
				{this.renderItems()}
			</ul>
		)
	}

}

WaitingOnPlayerList.propTypes = {
	players: React.PropTypes.array,
	selectedCards: React.PropTypes.array
}

export default WaitingOnPlayerList;