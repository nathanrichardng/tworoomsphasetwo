import React from 'react';
import SelectName from '../components/SelectName.jsx';

class GamePage extends React.Component {

	constructor() {
		super();
	}

	render() {
		if(this.props.stage == "Lobby") {
			return(
				//change to lobby component later
				<SelectName
					gameId={this.props.gameId}
					accessCode={this.props.accessCode} />
			)
		}
	}
}

GamePage.propTypes = {
	gameId: React.PropTypes.string,
	players: React.PropTypes.array,
	stage: React.PropTypes.string,
	leader: React.PropTypes.string,
	accessCode: React.PropTypes.string,
	deckList: React.PropTypes.array,
	timerLength: React.PropTypes.number,
	timerEndTime: React.PropTypes.date,
	timerPaused: React.PropTypes.bool,
	timerPausedTime: React.PropTypes.date
}

export default GamePage;