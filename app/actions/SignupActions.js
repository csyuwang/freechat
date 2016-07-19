import alt from '../alt';
import ajax from '../utils/ajax';
import AppActions from './AppActions';

class SignupActions {
  constructor() {
    this.generateActions(
      'updateUsername',
      'updatePassword',
      'updateRepeatPassword',
      'signupSuccess',
      'signupFail'
    );
  }

  signup(payload) {
    ajax()
    .post('/api/signup', {
      username: payload.username,
      password: payload.password
    })
    .done((user) => {
      this.actions.signupSuccess(payload);
      AppActions.fetchUser(user._id);
    })
    .fail((jqXhr) => {
      this.actions.signupFail(jqXhr);
    });
  }
}

export default alt.createActions(SignupActions);
