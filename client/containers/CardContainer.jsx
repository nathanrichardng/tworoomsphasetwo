
import {composeWithTracker} from 'react-komposer';
import Card from '../components/Card.jsx';

function composer(props, onData) {
  const handle = Meteor.subscribe("Cards");
  console.log("handle", handle);
  if(handle.ready()) {
  	console.log("handle ready");
  	//properties to pass
    console.log("props", props);
    const card = Cards.findOne({_id: props._id});
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