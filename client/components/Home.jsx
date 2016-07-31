import React from 'react';

class Home extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	errorText: false,
	    	accessCode: ""
	    };
	    this.updateAccessCode = this.updateAccessCode.bind(this);
	    this.createGame = this.createGame.bind(this);
	    this.joinGame = this.joinGame.bind(this);
	}

	updateAccessCode(e) {
		e.preventDefault();
		var entered = e.target.value.trim().toUpperCase();
		this.setState({ accessCode: entered, errorText: false });
	}

	createGame(e) {
		e.preventDefault();
		//Consider refactoring this later to make sure players leave any current games on creating a new one.
		Session.setPersistent("playerId", null)
		Meteor.call("createGame" , function(error, gameId) {
	        if(error) {
	          	console.log("error creating game", error);
	        }
	        else {
	        	console.log("gameId", gameId)
				FlowRouter.go("/game/"+gameId);
				const Airhorn = new Howl({
					src: ['/sounds/airhorn.mp3'],
					volume: 0.0
				});
				Airhorn.mute();
				Airhorn.play(); 
	        }
	    });
	}

	joinGame(e) {
		e.preventDefault();
		Session.setPersistent("playerId", null)
		var accessCode = this.state.accessCode;
		var game = Games.findOne({ accessCode: accessCode });
		console.log(game);
		if(game) {
			var gameId = game._id;
			FlowRouter.go("/game/"+gameId);
			console.log("gameId", gameId);
			var Airhorn = new Howl({
			  src: ['/sounds/airhorn.mp3'],
			  volume: 0.0
			});
			Airhorn.play(); 
		}
		else {
			this.refs.accessCode.focus();
			this.setState({ errorText: "No game found for that Access Code" });
		}
	}

	renderErrorText() {
		if(this.state.errorText) {
			return (
				<p className="bg-danger">{this.state.errorText}</p>
			)
		}
		else {
			return false;
		}
	}

	renderAccessCodeField() {
		return (
			<input 
				type="text" 
				ref="accessCode"
				value={this.state.accessCode} 
				className="form-control" 
				placeholder="Enter access code" 
				autoComplete="off" 
				onChange={this.updateAccessCode} />
		)
	}

	renderNewGameButton() {
		return(
			<button className="col-xs-12 col-md-4 col-md-offset-4 button new-game-button" onClick={this.createGame}>
				New Game
			</button>
		)
	}

	renderJoinGameButton() {
		return(
			<button className="col-xs-12 col-md-4 col-md-offset-4 button join-game-button">
				Join Game
			</button>
		)
	}

	renderSubmit() {
		if(this.state.accessCode == "") {
			return (
				this.renderNewGameButton()
			)
		}
		else {
			return (
				this.renderJoinGameButton()
			)
		}
	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
				  <img src="images/logo.svg" alt="" />
				  <div className="pull-right"><a href="/instructions">How to play</a></div>
				</div>
				<form onSubmit={this.joinGame}>
					{this.renderAccessCodeField()}
					{this.renderErrorText()}
					{this.renderSubmit()}
				</form>
				
				<div className="support-the-creators col-xs-12 col-md-4 col-md-offset-4">
					<div className="col-xs-12">
						<a href="mailto:contact@TuesdayKnightGames.com?subject=Feedback on the App">
							Leave us some feedback!
						</a>
					</div>
					<div className="col-xs-12">
						<a href="http://tuesdayknightgames.com/tworoomsandaboom/">
							Support the creators!
						</a>
					</div>
				</div>

				<div className="footer-text">
					<div className="container">
						<hr />
						&copy; Tuesday Knight Games 2013 <br />
						App developed by Nathan Richard Ng
					</div>
				</div>
			</div>
		)
	}
}

export default Home;