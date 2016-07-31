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

	renderWarning() {
		if(this.props.showWarning) {
			const warningStyle = {
				color: "#D23434"
			}
			return (
				<h4 style={warningStyle}>Not enough players for the selected cards.</h4>
			)
		}
	}

	renderDeckListModal() {
		if(this.props.isLeader) {
			return (
				<div style={this.deckListStyle}>
					<DeckList
						cards={this.props.cards}
						selectedCards={this.props.selectedCards}
						updateDeckList={this.props.updateDeckList}>

						<span className="glyphicon glyphicon-plus"></span>
					</DeckList>
				</div>
			)
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
					{this.renderDeckListModal()}
				</div>
				{this.renderWarning()}
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
	showWarning: React.PropTypes.bool,
	cards: React.PropTypes.array,
	isLeader: React.PropTypes.bool,
	selectedCards: React.PropTypes.array,
	updateDeckList: React.PropTypes.func
}

export default CardList;