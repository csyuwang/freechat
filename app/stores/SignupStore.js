import alt from '../alt';
import SignupActions from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

  onUpdateRepeatPassword(event) {
    this.repeatPassword = event.target.value;
  }

  onSignupSuccess(payload) {
      payload.router.transitionTo('/profile');
  }

  onSignupFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }


}

export default alt.createStore(SignupStore);
