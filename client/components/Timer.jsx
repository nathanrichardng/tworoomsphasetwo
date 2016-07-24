import React from 'react';

class Timer extends React.Component {

	constructor() {
		super();
		this.onStart = this.onStart.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onReset = this.onReset.bind(this);
		this.selectTimerLength = this.selectTimerLength.bind(this);
		this.selectCustomTimerLength = this.selectCustomTimerLength.bind(this);
	}

	onStart (e) {
		e.preventDefault();
		this.props.onStart();
	}

	onPause(e) {
		e.preventDefault();
		this.props.onPause();
	}

	onReset(e) {
		e.preventDefault();
		this.props.onReset();
	}

	selectTimerLength(e) {
		e.preventDefault();
		const length = e.target.dataset.length;
		this.props.onChangeTimerLength(length);
		$("#set-timer-modal").modal('hide');
	}

	selectCustomTimerLength(e) {
		e.preventDefault();
		const length = this.refs.customTimerLength.value;
		this.props.onChangeTimerLength(length);
		$("#set-timer-modal").modal('hide');
	}

	renderPlayButton() {
		if(this.props.paused) {
			return (
				<span className="glyphicon glyphicon-play start-timer col-xs-2" onClick={this.props.onStart}></span>
			)
		}
		else {
			return (
				<span className="glyphicon glyphicon-pause pause-timer col-xs-2" onClick={this.props.onPause}></span>
			)
		}
	}

	renderResetButton() {
		return (
			<span className="glyphicon glyphicon-repeat reset-timer col-xs-2" onClick={this.props.onReset}></span>
		)		
	}

	renderChangeTimerButton() {
		const timerLengthNodes = this.props.timerLengths.map((length, index) => (
	      <li className="list-group-item" key={index} data-length={length} onClick={this.selectTimerLength}>
	        {length}
	      </li>
	    ));
		return (
			<div>
				<span data-toggle="modal" data-target="#set-timer-modal" className="glyphicon glyphicon-time set-timer col-xs-2"></span>
				<div className="modal fade" tabIndex="-1" role="dialog" id="set-timer-modal">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title">Set Timer Length</h4>
				      </div>
				      <div className="modal-body">
				      	<form className="set-timer-length" onSubmit={this.selectCustomTimerLength}>
				      		<ul className="list-group">
				      			{timerLengthNodes}
				      		</ul>
				      		<input type="number" name="timerLength" ref="customTimerLength" className="width-100" />
				      		<input type="submit" className="btn btn-danger width-100" />
				      	</form>
				      </div>
				      <div className="modal-footer">
				        
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		)
	}

	renderControls() {
		if(this.props.showControls) {
			return (
				<span>
					{this.renderPlayButton()}
					{this.renderResetButton()}
					{this.renderChangeTimerButton()}
				</span>
			)
		}
		else {
			return false;
		}
	}

	render() {
		const timerStyle = {
			fontSize: "24px",
			color: "#495357",
			marginBottom: "16px"
		}
		return (
			<div>
				<div className="col-xs-12 col-md-4" style={timerStyle}>
					<span className="col-xs-6 time">{this.props.timeRemaining}</span>
					{this.renderControls()}
				</div>
			</div>
		)
	}
}

Timer.propTypes = {
	timeRemaining: React.PropTypes.string,
	paused: React.PropTypes.bool,
	isLeader: React.PropTypes.bool,
	onStart: React.PropTypes.func,
	onPause: React.PropTypes.func,
	onReset: React.PropTypes.func,
	timerLengths: React.PropTypes.array,
	onChangeTimerLength: React.PropTypes.func,
	showControls: React.PropTypes.bool
}

export default Timer;
