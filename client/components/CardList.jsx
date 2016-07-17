import React from 'react';
import List from '../components/List.jsx';
import DeckList from '../components/DeckList.jsx';

class CardList extends React.Component {

	constructor() {
		super();
		this.rowStyle = {
			marginTop: "20px",
			marginBottom: "10px"
		}
		this.headerStyle = {
			display: "inline"
		}
		this.deckListStyle = {
			display: "inline",
			float: "right"
		}
	}

	render() {
		const president = {
			name: "President",
			_id: "fakeIDPres"
		}
		const bomber = {
			name: "Bomber",
			_id: "fakeIDBomber"
		}
		var cards = this.props.cards.map( (card) => (card));
			cards.unshift(bomber);
			cards.unshift(president);

		var selectedCards = this.props.selectedCards.map( (card) => (card));
			selectedCards.unshift(bomber._id);
			selectedCards.unshift(president._id);

		console.log("selected cards", this.props.selectedCards);
			
		return(
			<div>
				<div style={this.rowStyle}>
					<h3 style={this.headerStyle}>
						Cards 
					</h3>
					<div style={this.deckListStyle}>
						<DeckList
							availableSlots={this.props.availableSlots}
							cards={this.props.cards}
							selectedCards={this.props.selectedCards}
							selectCard={this.props.selectCard}
							deselectCard={this.props.deselectCard}>

							<span className="glyphicon glyphicon-plus"></span>
						</DeckList>
					</div>
				</div>
				<List 
					items={cards}
					displayProperty="name"
					selectedValues={selectedCards}
					selectedProperty="_id"
					onlyShowSelected={true}
					selectedClass=" " />
			</div>	
		)
	}

}

CardList.propTypes = {
	availableSlots: React.PropTypes.number,
	cards: React.PropTypes.array,
	selectedCards: React.PropTypes.array,
	selectCard: React.PropTypes.func,
	deselectCard: React.PropTypes.func
}

export default CardList;