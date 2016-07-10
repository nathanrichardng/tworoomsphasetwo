import React from 'react';
import List from '../components/List.jsx';

class DeckList extends React.Component {

	constructor() {
		super();
		this.selectCard = this.selectCard.bind(this);
		this.deselectCard = this.deselectCard.bind(this);
	}

	selectCard(card) {
		this.props.selectCard(card);
	}

	deselectCard(card) {
		this.props.deselectCard(card);
	}

	render() {
		return (
			<div>
				<h3>Select Cards: {this.props.availableSlots}</h3>
				<List 
					items={this.props.cards}
					displayProperty="name"
					onSelectItem={this.selectCard}
					onDeselectItem={this.deselectCard}
					selectedValues={this.props.selectedCards}
					selectedProperty="_id"
					selectedIcon="glyphicon glyphicon-ok icon" />
			</div>
		)
	}

}

DeckList.propTypes = {
	availableSlots: React.PropTypes.number,
	cards: React.PropTypes.array,
	selectedCards: React.PropTypes.array,
	selectCard: React.PropTypes.func,
	deselectCard: React.PropTypes.func
}

export default DeckList;