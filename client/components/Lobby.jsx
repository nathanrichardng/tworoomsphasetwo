import React from 'react';
import AccessCode from '../components/AccessCode.jsx';
import PlayerList from '../components/PlayerList.jsx';
import SelectName from '../components/SelectName.jsx';
import DeckList from '../components/DeckList.jsx';

class Lobby extends React.Component {

	constructor() {
		super();
		this.leaveGame = this.leaveGame.bind(this);
		this.startGame = this.startGame.bind(this);
	}

	startGame(e) {
		e.preventDefault();
		this.props.startGame();
	}

	leaveGame(e) {
		e.preventDefault();
		this.props.leaveGame();
	}

	renderButtons() {
		if(this.props.playerId == this.props.leader) {
			return (
				<div>
					<button className="button start-game-button col-md-4 col-xs-12" onClick={this.startGame}>
							Start Game
					</button>
					<button className="button leave-game-button col-md-4 col-xs-12" onClick={this.leaveGame}>
						Leave Game
					</button>
				</div>
			)
		}
		else {
			return (
				<button className="button leave-game-button col-md-4 col-xs-12" onClick={this.leaveGame}>
					Leave Game
				</button>
			)
		}	
	}

	render() {
		console.log("players", this.props.players);
		console.log("playerId", this.props.playerId);
		if(this.props.playerId) {
			return (
				<div className="container lobby">
					<AccessCode accessCode={this.props.accessCode} />
					<DeckList
						availableSlots={this.props.availableSlots}
						cards={this.props.cards}
						selectedCards={this.props.selectedCards}
						selectCard={this.props.selectCard}
						deselectCard={this.props.deselectCard} />
					<PlayerList
						players={this.props.players}
						leader={this.props.leader} />
					{this.renderButtons()}
				</div>
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
	availableSlots: React.PropTypes.number,
	cards: React.PropTypes.array,
	selectedCards: React.PropTypes.array,
	selectCard: React.PropTypes.func,
	deselectCard: React.PropTypes.func,
	leader: React.PropTypes.string,
	players: React.PropTypes.array,
	joinGame: React.PropTypes.func,
	startGame: React.PropTypes.func,
	leaveGame: React.PropTypes.func
}

export default Lobby;