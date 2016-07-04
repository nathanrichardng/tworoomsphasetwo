import React from 'react';
import PlayerList from '../components/PlayerList.jsx';
import SelectName from '../components/SelectName.jsx';

class Lobby extends React.Component {

	constructor() {
		super();
	}

	render() {
		console.log("players", this.props.players);
		console.log("playerId", this.props.playerId);
		if(this.props.playerId) {
			return (
				<PlayerList
					players={this.props.players}
					leader={this.props.leader} />
			)
		}
		else {
			return (
				<SelectName 
					gameId={this.props.gameId}
					accessCode={this.props.accessCode}
					joinGame={this.props.joinGame} />
			)
		}
	}

}

Lobby.propTypes = {
	gameId: React.PropTypes.string,
	playerId: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	]),
	accessCode: React.PropTypes.string,
	leader: React.PropTypes.string,
	players: React.PropTypes.array,
	joinGame: React.PropTypes.func
}

export default Lobby;