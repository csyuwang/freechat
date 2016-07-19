import React from 'react';
import Signup from './Signup';

class Home extends React.Component {

  render() {
    return (
      <div className='homepage'>
        <div className='homepage-container container'>
          <div className='row'>
            <div className='homepage-intro col-sm-7'>
              <h4>
                Chat with anyone you want, about anything you want, free.
              </h4>
            </div>
            <div className='homepage-signup col-sm-5'>
              {
                this.props.user ? null : ( <Signup /> )
              }
            </div>
          </div>

        </div>
        <div className='homepage-background-image'>

        </div>
      </div>
    )
  }
}

export default Home;
