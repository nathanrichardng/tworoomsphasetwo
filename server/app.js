import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  	if (Cards.find({}).count() === 0) {
	    var bomber = {
	      name: "Bomber",
	      description: "You are the Bomber! End the game in the same room as the President, and the Red Team wins.",
	      team: "Red",
	      core: true
	    }

	    var president = {
	      name: "President",
	      description: "You are the President! End the game in a different room from the Bomber and the Blue Team wins.",
	      team: "Blue",
	      core: true
	    }

	    var agent = {
	      name: "Blue Team",
	      description: "You are a member of the Blue Team. Protect the president at all costs!",
	      team: "Blue",
	      core: true
	    }

	    var terrorist = {
	      name: "Red Team",
	      description: "You are a member of the Red Team. You should feel ashamed of your poor life choices.",
	      team: "Red",
	      core: true
	    }

	    var gambler = {
	      name: "Gambler",
	      description: "You must pick a side before the game is done. Better guess right!",
	      team: "Grey",
	      core: true
	    }

	    var terroristSpy = {
	      name: "Spy (Red Team)",
	      description: "Shhh...you're actually on the Red Team.",
	      team: "Blue",
	      core: false
	    }

	    var ctSpy = {
	      name: "Spy (Blue Team)",
	      description: "You are a highly trained spy in a deep cover operation. Gain the enemy's trust, gather intel, and most importantly: save the President.",
	      team: "Red",
	      core: false
	    }

	    var moby = {
	      name: "Moby",
	      description: "You are an elusive white whale that just wants to be left alone! You win the game if that pesky Captain Ahab winds up in the same room as the bomber.",
	      team: "Grey",
	      core: false
	    }

	    var ahab = {
	      name: "Ahab",
	      description: "You are Captain Ahab! Forever on the hunt for that darned white whale. You win the game if Moby winds up in the same room as the bomber. Let's see him swim away after that one!",
	      team: "Grey",
	      core: false
	    }

	    var terroristShyGuy = {
	      name: "Shy Guy (Red Team)",
	      description: "You tell everyone that you're shy, but really you just don't want to share anything about yourself.",
	      team: "Red",
	      core: false
	    }

	    var ctShyGuy = {
	      name: "Shy Guy (Blue Team)",
	      description: "It's not so much that you don't have anything to say, you just don't like to toot your own horn. In fact, you can't even tell anyone how proud you are of working with the president.",
	      team: "Blue",
	      core: false
	    }

	    var firstLady = {
	      name: "Wife",
	      description: "You've been with him through thick and thin; this crisis doesn't change any of that. End the game in the same room as the president and you win.",
	      team: "Grey",
	      core: false
	    }

	    var mistress = {
	      name: "Mistress",
	      description: "You've been working a lot of long hours together, and you can totally sense that there's a connection between you two. If only he wasn't married...End the game in the same room as the president (without his Wife) to win the game.",
	      team: "Grey",
	      core: false
	    }

	    var doctor = {
	      name: "Doctor",
	      description: "Bowties are cool, fezzes are cool, and you need to share your card with the president or else the blue team will lose!",
	      team: "Blue",
	      core: false
	    }

	    var engineer = {
	      name: "Engineer",
	      description: "You're smart. You pretty much designed the bomb that will blow the president up. Only...you forgot to tell the Bomber how to turn the darn thing on! Share cards with the Bomber before the game ends, or the Red team loses!",
	      team: "Red",
	      core: false
	    }

	    var blueCon = {
	      name: "Conman (Blue Team)",
	      description: "You were always pretty good at conversations; and once you share a bit about yourself, others just can't help but open up as well. When a player agrees to color share with you, private reveal instead. Then that player must privately reveal their card as well.",
	      team: "Blue",
	      core: false
	    }

	    var redCon = {
	      name: "Conman (Red Team)",
	      description: "Tricking people has always come naturally to you; and these blue fools just make it so damn easy. Any time you color share with a player, reveal your whole card instead. Then that player must privately reveal their whole card as well.",
	      team: "Red",
	      core: false
	    }

	    var blueNegotiator = {
	      name: "Negotiator (Blue Team)",
	      description: "You're not here to play games; you're here to broker a deal, and establishing trust is key. You may only share your full card with other players (and vice versa).",
	      team: "Blue",
	      core: false
	    }

	    var redNegotiator = {
	      name: "Negotiator (Red Team)",
	      description: "It's not quite as fun as lying to get information, but it serves your cause nonetheless. You may only share your full card with other players (and vice versa).",
	      team: "Red",
	      core: false
	    }

	    var blueSecurity = {
	      name: "Security (Blue Team)",
	      description: "Once per game you may reveal your card and 'Tackle' a player in the room (no, don't actually do it). That player cannot leave as a hostage for this round, and you must keep your card revealed for the rest of the game.",
	      team: "Blue",
	      core: false
	    }

	    var redSecurity = {
	      name: "Security (Red Team)",
	      description: "Once per game you may reveal your card and 'Tackle' a player in the room (no, don't actually do it). That player cannot leave as a hostage for this round, and you must keep your card revealed for the rest of the game.",
	      team: "Red",
	      core: false
	    }

	    Cards.insert(bomber);
	    Cards.insert(president);
	    Cards.insert(agent);
	    Cards.insert(terrorist);
	    Cards.insert(gambler);
	    Cards.insert(terroristSpy);
	    Cards.insert(ctSpy);
	    Cards.insert(moby);
	    Cards.insert(ahab);
	    Cards.insert(terroristShyGuy);
	    Cards.insert(ctShyGuy);
	    Cards.insert(firstLady);
	    Cards.insert(mistress);
	    Cards.insert(doctor);
	    Cards.insert(engineer);
	    Cards.insert(blueCon);
	    Cards.insert(redCon);
	    Cards.insert(blueNegotiator);
	    Cards.insert(redNegotiator);
	    Cards.insert(blueSecurity);
	    Cards.insert(redSecurity);
  	}
});
