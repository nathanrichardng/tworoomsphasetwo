
import {composeWithTracker} from 'react-komposer';
import Card from '../components/Card.jsx';

function composer(props, onData) {
  const playerHandle = Meteor.subscribe("Players");
  const cardHandle = Meteor.subscribe("Cards");

  if(playerHandle.ready() && cardHandle.ready()) {
  	console.log("handle ready");
  	//properties to pass
    console.log("props", props);
    const player = Players.findOne({ _id: props.playerId });
    const cardId = player.card;
    const card = Cards.findOne({_id: cardId});
    console.log("card", card);
  	const cardProps = {
  		_id: card._id,
  		name: card.name,
  		description: card.description,
      team: card.team
  	}
    //pass them in
    onData(null, cardProps);
  };
};

export default composeWithTracker(composer)(Card);