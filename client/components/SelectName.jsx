import React from 'react';

class SelectName extends React.Component {

	constructor() {
		super();
		this.joinGame = this.joinGame.bind(this);
	}

	copyAccessCode(e) {
		e.preventDefault();
		var urlField = document.getElementById('game-access-code');
        // select the contents
        urlField.setSelectionRange(0,9999);
        if(document.queryCommandSupported("copy")) {
          document.execCommand("copy");
        }
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
				<div className="row">
					<h4>Access Code:</h4>
					<div className="scroll-x well">
						<input 
							ref="accessCode"
							type="text" 
							className="form-control" 
							id="game-access-code" 
							name="gameAccessCode" 
							readOnly="readonly"
							value={this.props.accessCode} 
							onClick={this.copyAccessCode} />
					</div>
				</div>
				<form className="add-player-form" onSubmit={this.joinGame}>
					<div className="input-group">
				      <input type="text" placeholder="Choose a name" name="name" className="form-control" autocomplete="off" />
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


