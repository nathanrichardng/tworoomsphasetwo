import React from 'react';

class Card extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {hidden: false};
	    this.toggleDescription = this.toggleDescription.bind(this);
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
				<p>{this.props.description}</p>
			)
		}
	}

  	render() {
    	return (
      		<div onClick={this.toggleDescription}>
      			<h3>{this.props.name}</h3>
      			<hr/>
      			{this.renderDescription()}
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