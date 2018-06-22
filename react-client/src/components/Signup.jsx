import React from 'react'
import $ from 'jquery';
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
			console.log(res)
		})
	}

render(){
	return (
		<div>
		<h1>Signup</h1>
		<h3>Username :</h3>
		<input  name='username'
                    onChange={
                      this.onChange
                    }/>
		<h3>Email :</h3>
		<input name='email'
                    onChange={
                      this.onChange
                    }/>
		<h3>Password :</h3>
		<input name='password'
                    onChange={
                      this.onChange
                    }/>
		<br />
		<button onClick={  
			() => this.submit(this.state.username, this.state.email, this.state.password)
           }>Submit</button>
		</div>

		)
}
}

export default Signup
