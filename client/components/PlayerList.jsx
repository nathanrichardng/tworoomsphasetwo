import React from 'react';
import List from '../components/List.jsx';

class PlayerList extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<h3>Players</h3>
				<List 
					items={this.props.players}
					displayProperty="name"
					selectedValues={[this.props.leader]}
					selectedProperty="_id"
					selectedIcon="glyphicon glyphicon-flag icon" />
			</div>
		)
	}

}

PlayerList.propTypes = {
	players: React.PropTypes.array,
	leader: React.PropTypes.string
}

export default PlayerList;