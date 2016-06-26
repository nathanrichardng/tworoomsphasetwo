
import {composeWithTracker} from 'react-komposer';
import List from '../components/List.jsx';

function composer(props, onData) {
  const handle = Meteor.subscribe("Cards");
  console.log("handle", handle);
  if(handle.ready()) {
  	console.log("handle ready");
  	//properties to pass
  	const listProps = {
  		items: Cards.find({}, {sort: {_id: 1}}).fetch(),
  		displayProperty: "name",
  		path: "cards"
  	}
    //pass them in
    onData(null, listProps);
  };
};

export default composeWithTracker(composer)(List);