
import {composeWithTracker} from 'react-komposer';
import GamePage from '../components/GamePage.jsx';

function composer(props, onData) {
  console.log("rendering game page");
  const gameHandle = Meteor.subscribe("Games");
  const playerHandle = Meteor.subscribe("Players");
  const cardHandle = Meteor.subscribe("Cards");
  if(gameHandle.ready() && playerHandle.ready() && cardHandle.ready()) {
    console.log("handles ready");
    //properties to pass
    console.log("id", props._id);
    const game = Games.findOne({_id: props._id});
    const players = Players.find({ game: props._id }).fetch();
    const playerId = Session.get("playerId");
    //exclude these cards so players cant manipulate them. They will be added in by server side methods.
    const cards = Cards.find({ name: { $nin: ["President", "Bomber", "Blue Team", "Red Team"] } }).fetch();

    console.log("players", players);
    console.log("playerId", playerId);

    const gameProps = {
      gameId: game._id,
      playerId: playerId,
      players: players,
      stage: game.stage,
      leader: game.leader,
      accessCode: game.accessCode,
      cards: cards,
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