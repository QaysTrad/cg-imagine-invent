import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	username :'',
    	password:''
    }
  this.onChange = this.onChange.bind(this)
  this.login = this.login.bind(this)
	}
	  onChange (e) { 
    this.setState({
      [e.target.name]: e.target.value
    })
  };
	login(username , password){
		axios.post('login' , {username:username , 
			password:password})
		.then(function (res) {
			window.location.href = '/task'
		}).catch(function (err) {
			console.log(err)
		})
	}

render(){
	return (
		<div>
		<h1>Login</h1>
		<h3>Username :</h3>
		<input name='username' 
		onChange={this.onChange}
		/> 
		<h3>Password :</h3>
		<input name='password' 
		onChange={this.onChange}
		/> 
		<br />
		<button onClick={
			()=>this.login(this.state.username , this.state.password)
		}>Login</button>
		</div>
		)
}
}

export default Login
