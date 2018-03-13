import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
let arrForOne = [];
let arrForTwo = [];
const style = {
	padding: '1.6rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}
const typeStyle = {
	display: "block"
}
const dustbinTarget = {
	drop(props, monitor) {
		props.onDrop(monitor.getItem())
	},
}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
	constructor(props){
		super(props)
		this.state = {show: false, show2: false}
		this.toggleDiv = this.toggleDiv.bind(this)
		
	}
	toggleDiv = (e) =>{
		let type = e.currentTarget.getAttribute("data-type")
		this.setState({show: false, show2: false}) 
		
			if (type == "one") {
				this.setState({ show: !this.state.show})
			}else if(type == "two"){
				this.setState({ show2: !this.state.show2})
				
			}
			console.log(this.state)
	}
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
		lastDroppedItem: PropTypes.object,
		onDrop: PropTypes.func.isRequired,
	}

	render() {
		const {
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
			lastDroppedItem,
		} = this.props
		const isActive = isOver && canDrop
		let backgroundColor = '#222'
		if (isActive) {
			this.state.show = false;
			this.state.show2 = false;
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}
		if (lastDroppedItem != null) {
			if (arrForOne.indexOf(lastDroppedItem) == -1 && lastDroppedItem.type == "one") {
						arrForOne.push(lastDroppedItem)
			}else if(arrForTwo.indexOf(lastDroppedItem) == -1 && lastDroppedItem.type == "two"){
						arrForTwo.push(lastDroppedItem)
			}

		}
		// }
		// console.log(arrForOne, "one")	
		// console.log(arrForTwo, "two")			
		const imgOneAll = arrForOne.map((number) =>
		   <img style={{width: "150px"}} src={ number.url } /> 
		);
		const imgTwoAll = arrForTwo.map((number) =>
		   <img style={{width: "150px"}} src={ number.url } /> 
		);
		let gameOver = false
		if (arrForOne.length == 5  && arrForTwo.length == 5) {
			gameOver = true
		}
		return connectDropTarget(
			<div>
			<p> {gameOver ? "Done. Search new pics to sort" : "" } </p>
			
			<div  onClick={this.toggleDiv} data-type={accepts.join(', ')} style={{ ...style, backgroundColor }}>
				{isActive
					? 'Release to drop'
					: `This dustbin accepts:  ${accepts.join(', ')}`}
			</div>
			{this.state.show && <div>{imgOneAll}</div>}
			{this.state.show2 && <div>{imgTwoAll}</div>}
			</div>,
		)
	}
}
