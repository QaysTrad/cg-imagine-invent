import React from 'react'
import { BrowserRouter, Route, hashHistory, Switch } from 'react-router-dom'

import Home from './Home.jsx'

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
        
        </Switch>
        </BrowserRouter>
			)
	}
}

export default AppRoute
