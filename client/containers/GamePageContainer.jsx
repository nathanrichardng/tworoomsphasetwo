
import {composeWithTracker} from 'react-komposer';
import GamePage from '../components/GamePage.jsx';

function composer(props, onData) {
  console.log("rendering game page");
  const gameHandle = Meteor.subscribe("Games");
  const playerHandle = Meteor.subscribe("Players");
  if(gameHandle.ready() && playerHandle.ready()) {
    console.log("handles ready");
    //properties to pass
    console.log("id", props._id);
    const game = Games.findOne({_id: props._id});
    const players = Players.find({ game: props._id }).fetch();

    const gameProps = {
      gameId: game._id,
      players: players,
      stage: game.stage,
      leader: game.leader,
      accessCode: game.accessCode,
      deckList: game.deckList,
      timerLength: game.timerLength,
      timerEndTime: game.timerEndTime,
      timerPaused: game.timerPaused,
      timerPausedTime: game.timerPausedTime
    }
    //pass them in
    onData(null, gameProps);
  };
};

export default composeWithTracker(composer)(GamePage);