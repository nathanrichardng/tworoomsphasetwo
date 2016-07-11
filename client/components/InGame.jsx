import React from 'react';
import PlayerCardContainer from '../containers/PlayerCardContainer.jsx';
import Timer from '../components/Timer.jsx';

class InGame extends React.Component {

	constructor() {
		super();
		this.state = {
			timeRemaining: "3:00"
		}
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
	}

	componentDidMount() {
		console.log("timerEndTime", this.props.timerEndTime);
		console.log("timerPausedTime", this.props.timerPausedTime);
		this.interval = setInterval(this.getTimeRemaining, 500);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getTimeRemaining() {
		if(this.props.paused) {
			const endTime = moment(this.props.timerEndTime);
			const pausedTime = moment(this.props.timerPausedTime);
			const timeDiff = endTime.diff(pausedTime);
			const timeRemaining = timeDiff > 0 ? moment(timeDiff).format("m:ss") : "Times up!";
			this.setState({ timeRemaining: timeRemaining });
			return timeRemaining;
		}
		else {
			const endTime = moment(this.props.timerEndTime);
			const now = moment(TimeSync.serverTime(null, 500));
			const timeDiff = endTime.diff(now);
			const timeRemaining = timeDiff > 0 ? moment(timeDiff).format("m:ss") : "Times up!";
			console.log("return time", timeRemaining);
			this.setState({ timeRemaining: timeRemaining });
			return timeRemaining;
		}
	}

	render() {
		//TODO need to figure out why playercardcontainer keeps getting rerendered on state changes.
		return (
			<div>
				<Timer
					timeRemaining={this.state.timeRemaining}
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
	paused: React.PropTypes.bool,
	isLeader: React.PropTypes.bool,
	onStart: React.PropTypes.func,
	onPause: React.PropTypes.func,
	onReset: React.PropTypes.func,
	timerLengths: React.PropTypes.array,
	onChangeTimerLength: React.PropTypes.func,
	timerEndTime: React.PropTypes.object,
	timerPausedTime: React.PropTypes.object
}

export default InGame;