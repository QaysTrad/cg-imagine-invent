import React from 'react'
import axios from 'axios'

class Task extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			taskName:'' ,
			tasks:'',
			newTask:''
		}
		this.onChange = this.onChange.bind(this);
		this.addTask = this.addTask.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
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
			window.location.reload()
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

	delete(id){
		axios.post('/deleteTask',{id:id})
		.then(function(res){
			console.log(res)
		}).catch(function (err) {
			console.log(err)
		})
	}

	update(id , newT){
		axios.post('/updateTask' , {
			id : id,
			newTask : newT
		}).then(function (res) {
			console.log(res);
		}).catch(function (err) {
			console.log(err)
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
			{
				this.state.tasks === '' ?(
				<div>
				<h2>Loding... </h2>
				</div>
				)
			: this.state.tasks.map(item =>
				<div key={item._id}>
				<h3>{item.taskName} </h3>
				<h3>{item.complete} </h3>
				<button onClick={
					()=> this.delete(item._id)
				}>Delete</button>
				<h3>New Task</h3>
				<input name='newTask'
				onChange={this.onChange}
				/>
				<button onClick={
					()=> this.update(item._id , this.state.newTask)
				}>Update</button>
				</div>
			)
			}
			</div>
			</div>
			)
	}
}

export default Task