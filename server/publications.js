Meteor.publish("Cards", function() {
	return Cards.find({});
});
Meteor.publish("Players", function() {
	return Players.find({});
});
Meteor.publish("Games", function() {
	return Games.find({});
});