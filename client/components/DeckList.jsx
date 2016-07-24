import React from 'react';
import List from '../components/List.jsx';

class DeckList extends React.Component {

	constructor(props) {
		super();
		const selectedCards = props.selectedCards ? props.selectedCards : [];
		const availableSlots = props.availableSlots ? props.availableSlots : 0;
		this.state = {
			selectedCards: selectedCards,
			availableSlots: availableSlots
		};
		this.selectCard = this.selectCard.bind(this);
		this.deselectCard = this.deselectCard.bind(this);
		this.updateDeckList = this.updateDeckList.bind(this);
		this.listStyle = {
			maxHeight: "300px",
			overflow: "scroll"
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.setState({ selectedCards: nextProps.selectedCards, availableSlots: nextProps.availableSlots });
	}

	selectCard(card) {
		//exit if no slots available
		const availableSlots = this.state.availableSlots;
		const newSlots = availableSlots - 1;
		if(newSlots < 0) { return false; }
		//otherwise add card and update state
		const selectedCards = this.state.selectedCards;
			  selectedCards.push(card._id);
			  console.log("selectedCards", selectedCards);
		this.setState({ selectedCards: selectedCards, availableSlots: newSlots });
	}

	deselectCard(card) {
		const availableSlots = this.state.availableSlots;
		const newSlots = availableSlots + 1;
		const selectedCards = this.state.selectedCards;
		const index = selectedCards.indexOf(card._id);
		selectedCards.splice(index, 1);
		console.log("selectedCards", selectedCards);
		this.setState({ selectedCards: selectedCards, availableSlots: newSlots });
	}

	updateDeckList(e) {
		e.preventDefault();
		const newCards = this.state.selectedCards;
		this.props.updateDeckList(newCards);
		console.log("update");
	}

	componentWillUnmount() {
		$('#cards-list-modal').modal('hide');
	}

	renderCardList() {
		return (
			<div>
				<h3>Available slots: {this.state.availableSlots}</h3>
				<div style={this.listStyle}>
					<List 
						items={this.props.cards}
						displayProperty="name"
						onSelectItem={this.selectCard}
						onDeselectItem={this.deselectCard}
						selectedValues={this.state.selectedCards}
						selectedProperty="_id"
						selectedIcon="glyphicon glyphicon-ok icon" />
				</div>
			</div>
		)
	}

	render() {
		return(
			<div>
				<div>
					<span data-toggle="modal" data-target="#cards-list-modal" className="show-cards-button">
					  {this.props.children}
					</span>
				</div>
				<div className="modal fade" tabIndex="-1" role="dialog" id="cards-list-modal">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title">Add Cards</h4>
				      </div>
				      <div className="modal-body">
				        {this.renderCardList()}
				      </div>
				      <div className="modal-footer">
				      	<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      	<button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.updateDeckList}>Submit</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>	
		)
	}

}

DeckList.propTypes = {
	availableSlots: React.PropTypes.number,
	cards: React.PropTypes.array,
	selectedCards: React.PropTypes.array,
	updateDeckList: React.PropTypes.func
}

export default DeckList;