import React from 'react';

class AccessCode extends React.Component {

	constructor() {
		super();
	}

	copyAccessCode(e) {
		e.preventDefault();
		var urlField = document.getElementById('game-access-code');
        // select the contents
        urlField.setSelectionRange(0,9999);
        if(document.queryCommandSupported("copy")) {
          document.execCommand("copy");
        }
	}

	render() {
		return (
			<div className="row">
				<h4>Access Code:</h4>
				<div className="scroll-x well">
					<input 
						ref="accessCode"
						type="text" 
						className="form-control" 
						id="game-access-code" 
						name="gameAccessCode" 
						readOnly="readonly"
						value={this.props.accessCode} 
						onClick={this.copyAccessCode} />
				</div>
			</div>
		)
	}
}

AccessCode.propTypes = {
	accessCode: React.PropTypes.string,
}

export default AccessCode;