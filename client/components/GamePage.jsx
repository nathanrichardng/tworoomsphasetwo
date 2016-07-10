import React from 'react';
import Lobby from '../components/Lobby.jsx';
import InGame from '../components/InGame.jsx';

class GamePage extends React.Component {

	//TODO: add deck list component

	constructor() {
		super();
		this.getAvailableSlots = this.getAvailableSlots.bind(this);
		this.selectCard = this.selectCard.bind(this);
		this.deselectCard = this.deselectCard.bind(this);
		this.joinGame = this.joinGame.bind(this);
		this.startGame = this.startGame.bind(this);
		this.leaveGame = this.leaveGame.bind(this);
	}

	getAvailableSlots() {
		const numPlayers = this.props.players.length;
		const numCardsSelected = this.props.deckList.length;
		const numCardsAvailable = numPlayers - numCardsSelected - 2;
		if(numCardsAvailable > 0) { return numCardsAvailable; }
		else { return 0; }
	}

	selectCard(card) {
		const playerId = this.props.playerId;
		const cardId = card._id;
		const isLeader = (playerId === this.props.leader);
		const hasSlotsAvailable = (this.getAvailableSlots() > 0);
		if(isLeader && hasSlotsAvailable){
			console.log("selected card", card);
			Meteor.call("addCardToDeckList", playerId, cardId, function(error, result) {
	          if(result === "Not enough players") {
	            console.log("Not enough players");
	          }
	        });
		}
	}

	deselectCard(card) {
		const playerId = this.props.playerId;
		const cardId = card._id;
		const isLeader = (playerId === this.props.leader);
		if(isLeader) { Meteor.call("removeCardFromDeckList", playerId, cardId); }
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

	startGame() {
		//TODO implement startGame function
		console.log("starting game");
		const gameId = this.props.gameId;
		Meteor.call("startGame", gameId, function(error, success) {
	        if(error) {
	          console.log("error starting game", error);
	        }
	        else {
	          console.log("successfully started game", success);
	        }
	    })
	}

	leaveGame() {
		const gameId = this.props.gameId;
		console.log("Leaving Game");
		console.log("current game", Games.findOne({ _id: gameId }));
		const playerId = Session.get("playerId");
		Meteor.call("leaveGame", playerId, function(error, success) {
			if(error) {
			  console.log("error leaving game", error);
			  FlowRouter.go("/");
			}
			else {
			  console.log("successfully left game", success);
			  Session.setPersistent("playerId", null);
			  FlowRouter.go("/");
			}
		});
	}

	onStart() {
		console.log("onstart");
	}

	onPause() {
		console.log("onpause");
	}

	onReset() {
		console.log("onReset");
	}

	render() {
		const availableSlots = this.getAvailableSlots();
		if(this.props.stage == "Lobby") {
			return(
				<Lobby
					gameId={this.props.gameId}
					playerId={this.props.playerId}
					leader={this.props.leader}
					accessCode={this.props.accessCode}
					availableSlots={availableSlots}
					cards={this.props.cards}
					selectedCards={this.props.deckList}
					selectCard={this.selectCard}
					deselectCard={this.deselectCard}
					players={this.props.players}
					joinGame={this.joinGame}
					startGame={this.startGame}
					leaveGame={this.leaveGame} />
			)
		}
		else {
			const timerLengths= ["1 Minute", "3 Minutes", "5 Minutes"];
			return (
				<InGame 
					playerId={this.props.playerId}
					timeRemaining={this.props.timeRemaining}
					paused={this.props.paused}
					isLeader={this.props.isLeader}
					onStart={this.props.onStart}
					onPause={this.props.onPause}
					onReset={this.props.onReset}
					timerLengths={timerLengths} />
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
	cards: React.PropTypes.array,
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