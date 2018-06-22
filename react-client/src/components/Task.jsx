import React from 'react'
import axios from 'axios'

class Task extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			taskName:'' ,
			tasks:''
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
		axios.post('addTask' , {
			taskName : taskName,
			complete : false
		})
		.then(function (res) {
			console.log(res)
		}).catch(function (err) {
        console.log(err)
      })
	}
	 componentDidMount () { 
	 	var x = this
	  axios.get('/tasks')
	  .then(function(res){
	  	x.setState({tasks : res.data})
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
			<div>
			{this.state.tasks === '' ?(
				<div>
				<h2>Loding... </h2>
				</div>

				)
			: this.state.tasks.map(item =>
				<div key={item._id}>
				<h3>{item.taskName} </h3>
				<h3>{item.complete} </h3>
				</div>
			)
		}
			</div>
			</div>
			)
	}
}

export default Task