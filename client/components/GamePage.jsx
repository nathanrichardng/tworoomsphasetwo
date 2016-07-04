import React from 'react';
import Lobby from '../components/Lobby.jsx';

class GamePage extends React.Component {

	constructor() {
		super();
		this.joinGame = this.joinGame.bind(this);
	}

	joinGame(gameId, playerName) {
		Meteor.call("joinGame", gameId, playerName, function(error, playerId) {
			if(error) {
			  	console.log("error joining game", error);
			}
			else {
			  	Session.setPersistent("playerId", playerId);
			  	console.log("Player Id", playerId);
			}
		});
	}

	render() {
		if(this.props.stage == "Lobby") {
			return(
				//change to lobby component later
				<Lobby
					gameId={this.props.gameId}
					playerId={this.props.playerId}
					leader={this.props.leader}
					accessCode={this.props.accessCode}
					players={this.props.players}
					joinGame={this.joinGame} />
			)
		}
	}
}

GamePage.propTypes = {
	gameId: React.PropTypes.string,
	playerId: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	]),
	players: React.PropTypes.array,
	stage: React.PropTypes.string,
	leader: React.PropTypes.string,
	accessCode: React.PropTypes.string,
	deckList: React.PropTypes.array,
	timerLength: React.PropTypes.number,
	timerEndTime: React.PropTypes.oneOfType([
		React.PropTypes.date,
		React.PropTypes.bool
	]),
	timerPaused: React.PropTypes.bool,
	timerPausedTime: React.PropTypes.oneOfType([
		React.PropTypes.date,
		React.PropTypes.bool
	])
}

export default GamePage;