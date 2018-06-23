import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
  }
  this.onChange = this.onChange.bind(this)
  this.submit = this.submit.bind(this)
	}
	  onChange (e) { 
    this.setState({
      [e.target.name]: e.target.value
    })
  };
	submit(username , email , password){
		axios.post('signup' , {username:username , 
			email:email,
			password:password})
		.then(function (res) {
			window.location.href = '/task';
		}).catch(function (err) {
			alert('You may forget something');
			window.location.reload();
			console.log(err)
		})
	}

render(){
	return (
		<div className="container">
  			<div className="row">
		<h1>Signup</h1>
  			<div className="container">
  			<div className="well">
		<h3>Username :</h3>
                      <input  name='username' 
		onChange={this.onChange}
	  type="text" 
	  className="form-control"/>
		<h3>Email :</h3>
          <input  name='email' 
		onChange={this.onChange}
	  type="text" 
	  className="form-control"/>
		<h3>Password :</h3>
	 <input  name='password' 
		onChange={this.onChange}
	  type="password" 
	  className="form-control"/>
		<br />
		<br />
		<button type="button"
		 className="btn btn-raised btn-info"
		onClick={  
			() => this.submit(this.state.username, this.state.email, this.state.password)
           }>Signup</button>
  			</div>
			</div>
  			</div>
		</div>
		)
}
}

export default Signup
