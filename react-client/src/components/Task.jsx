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
			window.location.reload();
		}).catch(function (err) {
        console.log(err);
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
			window.location.reload();
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
			window.location.reload();
			console.log(res);
		}).catch(function (err) {
			console.log(err)
		})
	}

	completed(id){
		axios.post('/completedTask',{id:id})
		.then(function(res){
			console.log(res)
			window.location.reload();
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
				<div className="container">
  			<div className="row">
			<h1>Task</h1>
  			<div className="container">
  			<div className="well">
  				<button type="button" 
			className="btn btn-raised btn-secondary"
			style={{position: 'relative' , left: '900px'}}
			onClick={this.logout}>logout</button>

  				<h3>Add Task</h3>
			<input name='taskName'
			onChange={this.onChange}
			 type="text" 
	  		className="form-control"
			/>
			<button type="button"
			 className="btn btn-raised btn-info"
			onClick={
				()=> this.addTask(this.state.taskName)
			}>Add</button>
			<br/>	
			<br/>	
					<div className="container-fluid">
  <div className="row">
    <div className="col-sm-6" >
    <div className="well" style={{backgroundColor:"lavender"}}>
			<div>
			{
				this.state.notCompletedTask === '' ?(
				<div>
				<h2>No Tasks </h2>
				</div>
				)
			:( <div>
				<h2>Tasks You Have</h2>

			{

			 this.state.notCompletedTask.map(item =>
				<div key={item._id}>
					 <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
          <h3>New Task</h3>
				<input name='newTask'
				onChange={this.onChange}
				/>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal"
				 onClick={
					()=> this.update(item._id , this.state.newTask)
				}>Update</button>
        </div>
      </div>
    </div>
  </div>
  			<div className="well">

  <div className="dropdown">
  <button className="btn bmd-btn-icon dropdown-toggle" type="button" id="ex1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>
  </button>
  <div className="dropdown-menu dropdown-menu-left" aria-labelledby="ex1">
				<button className="dropdown-item btn " 
				onClick={
					()=> this.delete(item._id)
				}>Delete</button>
				
				<button className="dropdown-item btn " 
				data-toggle="modal" data-target="#myModal">Update</button>
				<button className="dropdown-item btn" 
				 onClick={
					()=> this.completed(item._id)
				}>Compete!</button>
  </div>
</div>
				
				<h3>{item.taskName} </h3>
 			 </div>
				</div>
			)
			}
			</div>	
			)
		}
			</div>
			</div>
    </div>
    <div className="col-sm-6" >
    	<div className="well" style={{backgroundColor:"#D0D8FD"}}>
  			<div>
			{this.state.completedTasks === '' ?(
				<div>
				<h2>No Completed Tasks</h2>
				</div>
				)
			: (
				<div>
				<h2>Competed Tasks</h2>
				<table className="table table-striped">
    		<thead>
    		  <tr>
       	 <td>Taks Name</td>
     	 </tr>
   			 </thead>
   			 	<tbody>
    			  <tr>
   			 { this.state.completedTasks.map(item => 
				<div key={item._id}>
					<td>{item.taskName}</td>
				</div>
				)}
     			 </tr>
   			 </tbody>
   			 </table>
				</div>
			)}
			</div>
  			</div>
    </div>
  </div>
</div>
  			</div>
  			</div>
  	
  			</div>
  			</div>
			)
	}
}

export default Task