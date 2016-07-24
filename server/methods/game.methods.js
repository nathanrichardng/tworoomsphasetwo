Meteor.methods({
  'createGame': function() {
        var gameId = Games.insert({
          stage: "Lobby"
        });

        return gameId;
  },
  'joinGame': function(gameId, playerName) {
    var playerId = Players.insert({ game: gameId, name: playerName});
    var game = Games.findOne({ _id: gameId });
    Games.update({ _id: gameId, stage: "Lobby" }, {
      $addToSet: { players: playerId }
    });
    
    return playerId;
  },
  'resetGame': function(gameId) {
    Games.update({ _id: gameId }, {
      $set: { stage: "Lobby" }
    });
  },
  'leaveGame': function(playerId) {
    var player = Players.findOne({ _id: playerId });

    if(player) {
      var gameId = player.game;

      Players.remove({ _id: playerId });

      Games.update({ _id: gameId }, {
        $pull: { players: playerId }
      });
    }

    //remove all games that are at least a day old
    var cutoffTime = moment().subtract(1, "days").toDate();
    Games.remove({ createdOn: { $lte: cutoffTime } });
    
    return "Left Game";
  },
  'addCardToDeckList': function(playerId, cardId) {
    var player = Players.findOne({ _id: playerId });
    var gameId = player.game;
    var game = Games.findOne({ _id: gameId });
    if (game.deckList.length + 2 >= game.players.length) {
      return "Not enough players";
    }
    if (!game.players[0] == playerId) {
      return "You are not the leader."
    }
    Games.update({ _id: gameId }, {
      $addToSet: { deckList: cardId }
    });
    return cardId + " was added to DeckList by " + playerId;
  },
  'updateDeckList': function(playerId, newDeckList) {
    var player = Players.findOne({ _id: playerId });
    var gameId = player.game;
    var game = Games.findOne({ _id: gameId });
    if (newDeckList.length + 2 > game.players.length) {
      return "Not enough players";
    }
    if (!game.players[0] == playerId) {
      return "You are not the leader."
    }
    Games.update({ _id: gameId }, {
      $set: { deckList: newDeckList }
    });
    return "DeckList was updated to " + newDeckList + " by " + playerId;
  },
  'removeCardFromDeckList': function(playerId, cardId) {
    var player = Players.findOne({ _id: playerId });
    var gameId = player.game;
    if (!game.players[0] == playerId) {
      return "You are not the leader."
    }
    Games.update({ _id: gameId }, {
      $pull: { deckList: cardId }
    });
    return cardId + " was removed from DeckList by " + playerId;
  },
  'startGame': function(gameId) {
    var game = Games.findOne({ _id: gameId });
    var players = Players.find({ game: gameId }).fetch();

    var dealer = {
      deck: game.deckList || [],
      players: players,
      addCoreCards: addCoreCards,
      getRemainingCards: getRemainingCards,
      addFiller: addFiller,
      shuffleDeck: shuffleDeck,
      updatePlayers: updatePlayers,
      startGame: startGame,
      dealCards: dealCards
    }

    dealer.dealCards();
    return "Cards Dealt";

    //Implementation details
    function addCoreCards() {
      var president = Cards.findOne({ name: "President" })._id;
      var bomber = Cards.findOne({ name: "Bomber" })._id;
      this.deck.push(president);
      this.deck.push(bomber);
    }

    function getRemainingCards() {
      return this.players.length - this.deck.length;
    }

    function addFiller() {
      var fillerCount = this.getRemainingCards();
      if (fillerCount % 2 === 1) {
        var gambler = Cards.findOne({ name: "Gambler" })._id;
        this.deck.push(gambler);
        fillerCount -= 1;
      };
      for(i = 0; i < (fillerCount/2); i++ ) {
        var agent = Cards.findOne({ name: "Blue Team" })._id;
        var terrorist = Cards.findOne({ name: "Red Team" })._id;
        this.deck.push(agent);
        this.deck.push(terrorist);
      };
    }

    function shuffleDeck() {
      this.deck = shuffle(this.deck);
    }

    function updatePlayers() {
      for(var i = 0; i < this.players.length; i++) {
        var playerId = this.players[i]._id;
        var cardId = this.deck[i];
        Players.update({ _id: playerId }, {
          $set: { card: cardId }
        }, { multi: true } );
      }
    }

    function startGame() {
      const now = moment().toDate();
      const endTime = moment().add(3, "minutes").toDate();
      Games.update({ _id: gameId }, {
        $set: { stage: "Round 1", timerPaused: true, timerEndTime: endTime, timerPausedTime: now  }
      });
    }

    function dealCards() {
      this.addCoreCards();
      this.addFiller();
      this.shuffleDeck();
      this.updatePlayers();
      this.startGame();
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }
});