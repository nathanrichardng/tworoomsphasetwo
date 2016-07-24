import React from 'react';

class AccessCodeModal extends React.Component {

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

	componentWillUnmount() {
		$('#access-code-modal').modal('hide');
	}

	render() {
		return(
			<div>
				<div>
					<span data-toggle="modal" data-target="#access-code-modal" className="pull-right show-cards-button">
					  {this.props.children}
					</span>
				</div>
				<div className="modal fade" tabIndex="-1" role="dialog" id="access-code-modal">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title">Access Code</h4>
				      </div>
				      <div className="modal-body">
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
				      <div className="modal-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>	
		)
	}

}

AccessCodeModal.propTypes = {
	accessCode: React.PropTypes.string
}

export default AccessCodeModal;