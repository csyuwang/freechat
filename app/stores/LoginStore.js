import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

  onLoginSuccess(payload) {
    payload.router.transitionTo('/lobby');
  }

  onLoginFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(LoginStore);
