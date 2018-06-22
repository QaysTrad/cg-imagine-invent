import React from 'react'
import { BrowserRouter, Route, hashHistory, Switch } from 'react-router-dom'

import Home from './Home.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'

class AppRoute extends React.Component {
	constructor(props){
		super(props);
		this.state = { }
	}
	render (){
		return (
		<BrowserRouter history={hashHistory}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
        </Switch>
        </BrowserRouter>
			)
	}
}

export default AppRoute
