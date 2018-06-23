import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	username: '',
    	password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.login = this.login.bind(this)
  }
	  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  login (username, password) {
    axios.post('login', {username: username,
      password: password})
      .then(function (res) {
        window.location.href = '/task'
      }).catch(function (err) {
        alert('Wrong username or password')
        window.location.reload()
        console.log(err)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h1>Login</h1>
          <div className='container'>
            <div className='well'>
              <h3>Username :</h3>
              <input name='username'
                onChange={this.onChange}
                type='text'
                className='form-control' />
              <h3>Password :</h3>
              <div className='form-group'>
                <input name='password'
                  onChange={this.onChange}
                  type='password'
                  className='form-control' />
              </div>
              <br />
              <br />
              <button type='button'
                className='btn btn-raised btn-info'
                onClick={
                  () => this.login(this.state.username, this.state.password)
                }>Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
