import React from 'react';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var username = this.state.username.trim();
    var password = this.state.password;

    if(!username) {

    }

    if(!password) {

    }

    if(username && password) {
      LoginActions.login({
          username: username,
          password: password,
          router: this.context.router
      });
    }

  }


  render() {
    return (
      <form className='navbar-form animated navbar-login-form' onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Username' value={this.state.username} onChange={LoginActions.updateUsername} />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' placeholder='Password' value={this.state.password} onChange={LoginActions.updatePassword} />
        </div>
        <button type='submit' className='btn btn-success'>Log in</button>
      </form>
    )
  }
}

Login.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Login;
