import React from 'react'
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
	}
 render(){
	return (
		<div>
		<a href='/signup'><button>signup</button></a>
		<a href='/login'><button>login</button></a>
		</div>

		)
 }
}

export default Home
