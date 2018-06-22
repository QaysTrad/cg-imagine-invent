import React from 'react'
import axios from 'axios'

class Task extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			taskName:'' 
		}
		this.onChange = this.onChange.bind(this);
		this.addTask = this.addTask.bind(this);
	}
	onChange(e){
		 this.setState({
      [e.target.name]: e.target.value
    })
	}
	addTask(taskName){
		axios.post('addTask' , {taskName : taskName})
		.then(function (res) {
			console.log(res)
		})
	}
	render(){
		return(
			<div>
			<h1>Task</h1>
			<h3>Add Task</h3>
			<input name='taskName'
			onChange={this.onChange}
			/>
			<button onClick={
				()=> this.addTask(this.state.taskName)
			}>Add</button>

			</div>
			)
	}
}

export default Task