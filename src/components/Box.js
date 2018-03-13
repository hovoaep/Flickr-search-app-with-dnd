import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}
const imgStyle = {
	width: "150px",
	height: "150px",
	float: "left",
	marginRight: '1.5rem',

}

const boxSource = {
	beginDrag(props) {
		return {
			url: props.url,
			type: props.type
		}
	},
}

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		// name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		isDropped: PropTypes.bool.isRequired,
	}

	render() {
		const { name, url, type, isDropped, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1
	
		return connectDragSource(
			<div style={{  opacity }}>
			{!isDropped && < img style={{...imgStyle}} src={ url } /> }	
			</div>
		)
	}
}
