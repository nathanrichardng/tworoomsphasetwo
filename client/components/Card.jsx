import React from 'react';

class Card extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {hidden: false};
	    this.toggleDescription = this.toggleDescription.bind(this);
	    this.fullHeightStyle = {
	    	height: "100%"
	    }
	}

	toggleDescription(e) {
		e.preventDefault();
		var hidden = this.state.hidden;
		this.setState({ hidden: !hidden });
	}

	renderDescription() {
		if(this.state.hidden) {
			return false;
		}
		else {
			return (
				<div style={this.fullHeightStyle}>
					<h4>{this.props.name}</h4>
					<p>{this.props.description}</p>
				</div>
			)
		}
	}

	renderIcon() {
		switch(this.team) {
			case "Red":
				return (
					<i className="fa fa-bomb"></i>
				)
			case "Blue":
				return (
					<i className="fa fa-shield"></i>
				)
			case "Grey":
				return (
					<i className="fa fa-bomb"></i>
				)
			default:
				return false;
		}
	}

  	render() {
  		const cardClass = "col-xs-12 col-md-4 card " + this.props.team;
  		const fullHeightStyle = {
  			minHeight: "350px"
  		}
    	return (
    		<div className={cardClass}>
    			<div className="card-team">
					<h3>{this.props.team} Team<span className="pull-right">{this.renderIcon()}</span></h3>
					<hr/>
				</div>
	      		<div onClick={this.toggleDescription} style={this.fullHeightStyle}>
	      			{this.renderDescription()}
	      		</div>
	      	</div>
    	);
  	}
}

Card.propTypes = {
	_id: React.PropTypes.string,
	name: React.PropTypes.string,
	description: React.PropTypes.string,
	team: React.PropTypes.string
}

export default Card;