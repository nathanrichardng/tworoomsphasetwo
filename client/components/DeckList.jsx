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

	renderCardList() {
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

	render() {
		return(
			<div>
				<div className="col-xs-12 ">
					<span data-toggle="modal" data-target="#cards-list-modal" className="pull-right show-cards-button">
					  <span className="glyphicon glyphicon-plus"></span> Cards
					</span>
				</div>
				<div className="modal fade" tabindex="-1" role="dialog" id="cards-list-modal">
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
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
	selectCard: React.PropTypes.func,
	deselectCard: React.PropTypes.func
}

export default DeckList;