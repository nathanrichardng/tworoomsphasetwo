Meteor.methods({
	'startTimer': function(gameId) {
		var game = Games.findOne({ _id: gameId });
		var endTime;
		if (game.timerPaused) {
			var timeElapsed = moment().diff(moment(game.timerPausedTime));
				endTime = moment(game.timerEndTime).add(timeElapsed, "ms").toDate();
		}
		else if (game.timerEndTime) {
			endTime = game.timerEndTime;
		}
		else {
			endTime = moment().add(game.timerLength, "minutes").toDate();
		}
		Games.update({ _id: gameId }, {
			$set: { timerEndTime: endTime, timerPaused: false, timerPausedTime: null }
		});
		return endTime;
	},
	'pauseTimer': function(gameId) {
		var game = Games.findOne({ _id: gameId });
		var pausedTime = moment().toDate();
		if (game.timerPaused) {
			return "Already paused";
		}
		Games.update({ _id: gameId }, {
			$set: { timerPaused: true, timerPausedTime: pausedTime }
		});
		return pausedTime;
	},
	'resetTimer': function(gameId) {
    var game = Games.findOne({ _id: gameId });
    var now = moment().toDate();
    var endTime = moment().add(game.timerLength, "minutes").toDate();
		Games.update({ _id: gameId }, {
			$set: { timerEndTime: endTime, timerPaused: true, timerPausedTime: now }
		});
		return "timer reset";
	},
  'setTimerLength': function(gameId, length) {
    var filteredLength = length >= 0 ? length : 3;
    var game = Games.findOne({ _id: gameId });
    var now = moment().toDate();
    var endTime = moment().add(filteredLength, "minutes").toDate();
    Games.update({ _id: gameId }, {
      $set: { timerLength: filteredLength, timerEndTime: endTime, timerPaused: true, timerPausedTime: now }
    });
    return "updated timer length";
  }
});