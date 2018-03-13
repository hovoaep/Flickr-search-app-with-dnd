import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import Search from "./Search"
@DragDropContext(HTML5Backend)
export default class Container extends Component {
	constructor(props) {
		super(props)
		const _this = this
		var ItemTypes = {
				ONE: "one",
				TWO: "two"
		}
		this.state = {
			dustbins: [
				{ accepts: [ItemTypes.ONE], lastDroppedItem: null },
				{ accepts: [ItemTypes.TWO], lastDroppedItem: null },
			
			],
			boxes: [],
			droppedBoxNames: [],
			photos: [],
		}

    		this.handleGetPhotos = this.handleGetPhotos.bind(this);

		}
	  	handleGetPhotos(photos){
    		this.setState({'boxes': photos});
		};

		isDropped(boxName) {
		return this.state.droppedBoxNames.indexOf(boxName) > -1
		}
	render() {
		const { boxes, dustbins } = this.state
		return (
			<div>
			<Search _getPhotos={this.handleGetPhotos} />
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					{boxes.map(({ name, type, url }, index) => (
						<Box
							name={ name }
							type={ type }
							url= { url }
							isDropped={ this.isDropped(url) }
							key={ index }
						/>
					))}
				</div>
				<hr/>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					{dustbins.map(({ accepts, lastDroppedItem }, index) => (
						<Dustbin
							accepts={accepts}
							lastDroppedItem={lastDroppedItem}
							onDrop={item => this.handleDrop(index, item)}
							key={index}
						/>
					))}
				</div>
			</div>
		)
	}

	handleDrop(index, item) {
		const { url } = item
		const droppedBoxNames = url ? { $push: [url] } : {}

		this.setState(
			update(this.state, {
				dustbins: {
					[index]: {
						lastDroppedItem: {
							$set: item,
						},
					},
				},
				droppedBoxNames,
			}),
		)
	}
}
