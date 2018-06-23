import React from 'react'
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='display-2'>Welcome</h1>
          <div className='container'>
            <div className='well'>
              <a href='/signup'><button type='button' className='btn btn-raised btn-secondary'>signup</button></a>
              <br />
              <br />
              <a href='/login'><button type='button' className='btn btn-raised btn-secondary'>login</button></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
