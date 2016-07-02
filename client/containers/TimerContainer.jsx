
import {composeWithTracker} from 'react-komposer';
import GamePage from '../components/GamePage.jsx';

function composer(props, onData) {
  const timerProps = {
    timeRemaining: "2:30",
    paused: false,
    isLeader: true,
    onStart: function(){ console.log("onstart"); },
    onPause: function(){ console.log("onPause"); },
    onReset: function(){ console.log("onReset"); },
    timerLengths: ["1 Minute", "3 Minutes", "5 Minutes"],
    onChangeTimerLength: function(timerLength){ console.log("onChangeTimerLength", timerLength); }
  }
  onData(null, timerProps);
};

export default composeWithTracker(composer)(GamePage);