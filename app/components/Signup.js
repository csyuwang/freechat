import React from 'react';
import SignupActions from '../actions/SignupActions';
import SignupStore from '../stores/SignupStore';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var username = this.state.username.trim();
    var password = this.state.password;
    var repeatPassword = this.state.repeatPassword;

    if(!username) {

    }

    if(!password) {

    }

    if(password !== repeatPassword) {

    }

    if(username && password && password === repeatPassword) {
      SignupActions.signup({
          username: username,
          password: password,
          router: this.context.router
      });
    }

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Pick a username' value={this.state.username} onChange={SignupActions.updateUsername} />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' placeholder='Create a password' value={this.state.password} onChange={SignupActions.updatePassword} />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' placeholder='Confirm the password' value={this.state.repeatPassword} onChange={SignupActions.updateRepeatPassword} />
        </div>
        <button type='submit' className='btn btn-lg btn-success btn-block'>Sign up for FreeChat</button>
      </form>
    )
  }
}

Signup.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Signup
