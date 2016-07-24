import React from 'react';
import AccessCode from '../components/AccessCode.jsx';

class SelectName extends React.Component {

	constructor() {
		super();
		this.joinGame = this.joinGame.bind(this);
	}

	joinGame(e) {
		e.preventDefault();
		var gameId = this.props.gameId;
		var playerName = e.target.name.value;
		console.log("game id", gameId);
		console.log("player name", playerName);
		this.props.joinGame(gameId, playerName);
	}

	render() {
		return (
			<div className="container">
				<AccessCode 
					accessCode={this.props.accessCode} />
				<form className="add-player-form" onSubmit={this.joinGame}>
					<div className="input-group">
				      <input type="text" placeholder="Choose a name" name="name" className="form-control" autoComplete="off" />
				      <span className="input-group-btn">
				        <input className="btn btn-default" type="submit" value="Join Lobby" />
				      </span>
				    </div>
				</form>
			</div>
		)
	}

}

SelectName.propTypes = {
	gameId: React.PropTypes.string,
	accessCode: React.PropTypes.string,
	joinGame: React.PropTypes.func
}

export default SelectName;


