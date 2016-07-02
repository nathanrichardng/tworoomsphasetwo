import React from 'react';
import Timer from '../components/Timer.jsx';

class GamePage extends React.Component {

	constructor() {
		super();
		this.state = {
			timeRemaining: "3:00",
			paused: true
		};
		this.onStart = this.onStart.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onReset = this.onReset.bind(this);
		this.selectTimerLength = this.selectTimerLength.bind(this);
	}

	onStart() {
		console.log("started");
		this.setState({ paused: false });
	}

	onPause() {
		console.log("paused");
		this.setState({ paused: true });
	}

	onReset() {
		console.log("resetting timer");
		this.setState({ timeRemaining: "3:00" });
	}

	selectTimerLength(length) {
		console.log("updated timer length", length);
		this.setState({ timeRemaining: length });
	}

	render() {
		return (
			<Timer 
				timeRemaining={this.state.timeRemaining}
				paused={this.state.paused}
				isLeader={true}
				onStart={this.onStart}
				onPause={this.onPause}
				onReset={this.onReset}
				timerLengths={["1:00", "3:00", "5:00"]}
				onChangeTimerLength={this.selectTimerLength} />
		)
	}
}

export default GamePage;