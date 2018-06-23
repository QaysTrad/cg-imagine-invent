import React from 'react'
import axios from 'axios'

class Task extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			taskName:'' ,
			completedTasks:'',
			notCompletedTask:'',
			newTask:''
		}
		this.onChange = this.onChange.bind(this);
		this.addTask = this.addTask.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
		this.completed = this.completed.bind(this);
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
		}).catch(function (err) {
        console.log(err)
      })
	}
	 componentDidMount () { 
	 	var x = this
	 	var completed = [];
	 	var notCompleted = [];
	  axios.get('/tasks')
	  .then(function(res){
	  	for (var i = 0; i < res.data.length; i++) {
	  		if(res.data[i].complete === false){
	  			completed.push(res.data[i])
	  			x.setState({notCompletedTask : completed})
	  		}else {
	  			notCompleted.push(res.data[i])
	  			x.setState({completedTasks : notCompleted})
	  		}
	  	}
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

	completed(id){
		axios.post('/completedTask',{id:id})
		.then(function(res){
			console.log(res)
		}).catch(function (err) {
			console.log(err)
		})
	}

	logout(){
		axios.get('/logout')
	   .then(function (res) {
        window.location.href = '/'
      }).catch(function (err) {
        console.log('logout err ', err)
      })
	}
	render(){
		return(
			<div>
			<button onClick={this.logout}>logout</button>
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
				this.state.notCompletedTask === '' ?(
				<div>
				<h2>Loding... </h2>
				</div>
				)
			: this.state.notCompletedTask.map(item =>
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
				<button onClick={
					()=> this.completed(item._id)
				}>Compete !</button>
				</div>
			)
			}
			</div>
			<div>
			{this.state.completedTasks === '' ?(
				<div>
				<h2>No Completed Tasks</h2>
				</div>
				)
			: this.state.completedTasks.map(item => 
				<div key={item._id}>
				<h2>Competed Tasks</h2>
					<h3>{item.taskName}</h3>
				</div>
			)}
			</div>
			</div>
			)
	}
}

export default Task