import React from 'react';
import Lobby from '../components/Lobby.jsx';
import InGame from '../components/InGame.jsx';

class GamePage extends React.Component {

	constructor() {
		super();
		this.hasRequiredPlayers = this.hasRequiredPlayers.bind(this);
		this.updateDeckList = this.updateDeckList.bind(this);
		this.joinGame = this.joinGame.bind(this);
		this.startGame = this.startGame.bind(this);
		this.leaveGame = this.leaveGame.bind(this);
		this.returnToLobby = this.returnToLobby.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onChangeTimerLength = this.onChangeTimerLength.bind(this);
		this.state = {
			showWarning: false
		}
	}

	componentWillReceiveProps(nextProps) {
		const numPlayers = nextProps.players.length;
		const numCardsSelected = nextProps.deckList.length;
		if(numCardsSelected < numPlayers) {
			this.setState({ showWarning: false });
		}
	}

	hasRequiredPlayers() {
		const numPlayers = this.props.players.length;
		const numCardsSelected = this.props.deckList.length;
		if(numCardsSelected + 2 > numPlayers) {
			this.setState({ showWarning: true });
			return false;
		}
		else {
			this.setState({ showWarning: false });
			return true;
		}
	}

	updateDeckList(newCards) {
		const playerId = this.props.playerId;
		const isLeader = (playerId === this.props.leader);
		const self = this;
		if(isLeader){
			console.log("updating decklist", newCards);
			Meteor.call("updateDeckList", playerId, newCards, function(error, result) {
	          if(result === "Not enough players") {
	            console.log("Not enough players");
	          }
	          else {
	          	self.setState({ showWarning: false });
	          }
	        });
		}
		else {
			console.log("Unable to add cards.");
		}
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
		const numPlayers = this.props.players.length;
		const numCardsSelected = this.props.deckList.length;
		if(!this.hasRequiredPlayers()) {
			return false
		}
		//otherwise start the game
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

	returnToLobby() {
		console.log("return to lobby");
		const gameId = this.props.gameId;
		Meteor.call("resetGame", gameId, function(error, success) {
	        if(error) {
	          console.log("error restarting game", error);
	        }
	        else {
	          console.log("successfully restarted game", success);
	        }
	    })
	}

	onStart() {
		console.log("onstart");

		Meteor.call("startTimer", this.props.gameId, function(error, time) {
	        console.log("start time", time);
	    });
	}

	onPause() {
		console.log("onpause");
		Meteor.call("pauseTimer", this.props.gameId, function(error, time) {
	        console.log("pause time", time);
	    });
	}

	onReset() {
		console.log("onReset");
		Meteor.call("resetTimer", this.props.gameId, function(error, time) {
	        console.log("reset time", time);
	    });
	}

	onChangeTimerLength(time) {
		console.log("onChangeTimerLength", time);
		var timerLength;
		switch(time) {
			case "1 Minute":
				timerLength = 1;
				break;
			case "3 Minutes":
				timerLength = 3;
				break;
			case "5 Minutes":
				timerLength = 5;
				break;
			default:
				timerLength = time;
		}
		Meteor.call("setTimerLength", this.props.gameId, timerLength, function(error, success) {
	        console.log("set timer length", success);
	    });
	}

	render() {
		if(this.props.stage == "Lobby") {
			return(
				<Lobby
					gameId={this.props.gameId}
					playerId={this.props.playerId}
					leader={this.props.leader}
					accessCode={this.props.accessCode}
					showWarning={this.state.showWarning}
					cards={this.props.cards}
					selectedCards={this.props.deckList}
					updateDeckList={this.updateDeckList}
					players={this.props.players}
					joinGame={this.joinGame}
					startGame={this.startGame}
					leaveGame={this.leaveGame} />
			)
		}
		else if(this.props.playerId) {
			const timerLengths= ["1 Minute", "3 Minutes", "5 Minutes"];
			const isLeader = (this.props.playerId == this.props.leader)
			return (
				<InGame 
					playerId={this.props.playerId}
					paused={this.props.timerPaused}
					isLeader={isLeader}
					onStart={this.onStart}
					onPause={this.onPause}
					onReset={this.onReset}
					timerEndTime={this.props.timerEndTime}
					timerPausedTime={this.props.timerPausedTime}
					onChangeTimerLength={this.onChangeTimerLength}
					timerLengths={timerLengths}
					leaveGame={this.leaveGame}
					returnToLobby={this.returnToLobby} />
			)
		}
		else {
			return (
				<div className="container">
					<div className="jumbotron">
					  <h1>You don't have a card!</h1>
					  <p>Looks like your friends started without you.</p>
					  <p>You should probably go yell at them to remake the game or something.</p>
					</div>
				</div>
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