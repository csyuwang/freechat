import React from 'react';
import { Link } from 'react-router';
import NavBarActions from '../actions/NavBarActions';
import NavBarStore from '../stores/NavBarStore';

class NavBar extends React.Component {

  constructor(props){
    super(props);
    this.state = NavBarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavBarStore.listen(this.onChange);
    let socket = io();

    socket.on('onlineUsers', (data) => {
      NavBarActions.updateOnlineUsers(data);
    })
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated '}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            FreeChat
            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
          </Link>
      </div>
      <div id='navbar' className='navbar-collapse collapse'>
        <form ref='searchForm' className='navbar-form navbar-left animated'>
          <div className='input-group'>
            <input type='text' className='form-control' />
            <span className='input-group-btn'>
              <button className='btn btn-default'><span className='glyphicon glyphicon-search'></span></button>
            </span>
          </div>
        </form>
        <ul className='nav navbar-nav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/rooms'>Rooms</Link></li>
        </ul>
        </div>
      </nav>
    );
  }
}

NavBar.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default NavBar;
