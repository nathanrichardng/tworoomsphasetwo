import React from 'react';
import PlayerCardContainer from '../containers/PlayerCardContainer.jsx';
import Timer from '../components/Timer.jsx';

class InGame extends React.Component {

	constructor() {
		super();
	}

	render() {
		//TODO need to get Timer portion working
		return (
			<div>
				<Timer
					timeRemaining={this.props.timeRemaining}
					paused={this.props.paused}
					isLeader={this.props.isLeader}
					onStart={this.props.onStart}
					onPause={this.props.onPause}
					onReset={this.props.onReset}
					timerLengths={this.props.timerLengths}
					onChangeTimerLength={this.props.onChangeTimerLength} />
				<PlayerCardContainer playerId={this.props.playerId} />
			</div>
		)
	}

}

InGame.propTypes = {
	playerId: React.PropTypes.string,
	timeRemaining: React.PropTypes.string,
	paused: React.PropTypes.bool,
	isLeader: React.PropTypes.bool,
	onStart: React.PropTypes.func,
	onPause: React.PropTypes.func,
	onReset: React.PropTypes.func,
	timerLengths: React.PropTypes.array,
	onChangeTimerLength: React.PropTypes.func
}

export default InGame;