import React from 'react'

class Task extends React.Component {
	constructor(props){
		super(props)
		this.state = { }
	}
	render(){
		return(
			<div>
			<h1>Task</h1>
			<h3>Add Task</h3>
			<input />
			<button>Add</button>
			</div>
			)
	}
}

export default Task