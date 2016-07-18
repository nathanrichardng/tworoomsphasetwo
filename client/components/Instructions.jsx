import React from 'react';

class Instructions extends React.Component {
	constructor(props) {
	    super(props);
	}

	render() {
		return (
			<div className="instructions">
				<h1>How to play</h1>
				<hr />
				<h3>Setup</h3>
				<ol>
					<li>Acquire friends (this is arguably the hardest step).</li>
					<li>Elect your least-lazy friend to create a game and text you the invite.</li>
					<li>Start the game once all your friends have joined. (Or at least the ones you actually care about)</li>
					<li>Evenly divide your group of friends into two rooms. <br />
						<div className="text-danger"><strong>Note:</strong> If your group consists of an odd number of friends, <strong>DO NOT</strong> try to evenly divide the last person.</div>
					</li>
				</ol>
				<h3>Playing the game</h3>
				<ul>
					<li>Each game consists of 3 rounds (You can decide how long they last, but they are typically 3 minutes for the first round, 2 minutes for the second, and 1 minute for the third).</li>
					<li>During each round, both rooms elect a leader. That leader remains in power until (s)he is impeached.</li>
					<li>A leader may be impeached at any time before the end of the round, as long as at least half of the room agrees.</li>
					<li>Throughout the round, players may share all (or part) of their card with eachother. This is typically where alliances are formed. If you feel like you may be in the minority, it's probably in your best interests to keep your card a secret and try to trick the other players into electing a leader who's on <em>your</em> side.</li>
					<li>At the end of each round, the leader chooses which "hostages" will be traded with the other room (3 for the first round, 2 for the second, and 1 for the third).</li>
					<li>At the end of the game:
						<ol>
							<li>The Terrorists win if the bomber and the president are in the same room.</li>
							<li>The Counter-Terrorists win if the president and bomber are in separate rooms.</li>
							<li>The Individuals win if they have accomplished their own secret agendas.</li>
						</ol>
					</li>
				</ul>
				<div className="margin-bottom"><a href="/">Back to Main Menu</a></div>
			</div>
		)
	}
}

export default Instructions;

