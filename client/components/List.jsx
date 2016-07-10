import React from 'react';

class List extends React.Component {

	constructor() {
		super();
		this.onClickItem = this.onClickItem.bind(this);
	}

	isSelected(item) {
		const selected = this.props.selectedValues;
		//exit if nothing in selected array
		if(!selected || selected.length === 0) { return false; }
		//determine if item is in selected array
		const selectedProperty = this.props.selectedProperty;
		const comparitor = selectedProperty ? item[selectedProperty] : item;
		const isSelected = (selected.indexOf(comparitor) > -1);
		return isSelected;
	}

	onClickItem(e) {
		e.preventDefault();
		if(this.props.onSelectItem) {
			const index = e.target.dataset.index;
			const item = this.props.items[index];
			const selected = this.isSelected(item);
			if(selected && this.props.onDeselectItem) {
				this.props.onDeselectItem(item);
			}
			else {
				this.props.onSelectItem(item);
			}
		}	
	}

	renderIcon(isSelected) {
		const icon = this.props.selectedIcon
		const iconStyle = {
			pointerEvents: "none"
		}
		if(isSelected && icon) {
			return (
				<span className={icon} style={iconStyle}></span> 
			)
		}
		else {
			return false;
		}
	}

	renderItem(item, index) {
		const display = this.props.displayProperty ? item[this.props.displayProperty] : item;
		const isSelected = this.isSelected(item);
		const selectedClass = isSelected ? "selected" : "";
		if(this.props.path) {
			const href = FlowRouter.path(this.props.path + "/" + item._id);
			return (
				<li className={"list-group-item " + selectedClass} key={index}>
					<a href={href}>{display} {this.renderIcon(isSelected)}</a>
				</li>
			)
		}
		else {
			return (
				<li className={"list-group-item " + selectedClass} key={index} data-index={index} onClick={this.onClickItem}>
					{display} {this.renderIcon(isSelected)}
				</li>
			)
		}
	}

	renderItems() {
		const itemNodes = this.props.items.map((item, index) => (
			this.renderItem(item, index)
		));
		return itemNodes;
	}

	render() {
		return (
			<ul className="list-group">
				{this.renderItems()}
			</ul>
		)
	}

}

List.propTypes = {
	items: React.PropTypes.array,
	displayProprty: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	]),
	path: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	]),
	onSelectItem: React.PropTypes.oneOfType([
		React.PropTypes.func,
		React.PropTypes.bool
	]),
	onDeselectItem: React.PropTypes.oneOfType([
		React.PropTypes.func,
		React.PropTypes.bool
	]),
	selectedValues: React.PropTypes.oneOfType([
		React.PropTypes.array,
		React.PropTypes.bool
	]),
	selectedProperty: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	]),
	selectedIcon: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool
	])
}

export default List;