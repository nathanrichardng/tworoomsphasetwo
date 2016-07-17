import React from 'react';

class MenuBar extends React.Component {

	constructor() {
		super();
		this.listStyle = {
			listStyleType: "none",
			margin: "0px",
			padding: "0px",
			width: "100%",
			backgroundColor: "#E1E7FF",
			float: "left"
		}
		this.inlineStyle = {
			display: "inline",
			padding: "10px",
			float: "left"
		}
	}

	renderItems() {
		const itemNodes = this.props.children.map( (item, index) => (
			<li key={index} style={this.inlineStyle}>{item}</li>
		))
		return itemNodes;
	}

	render() {
		return(
			<div className="row">
				<div className="col-xs-12">
					<ul style={this.listStyle}>
						{this.renderItems()}
					</ul>
				</div>
			</div>	
		)
	}

}

export default MenuBar;