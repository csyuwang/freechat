import alt from '../alt';
import ajax from '../utils/ajax';
import {assign} from 'underscore';
import AppActions from './AppActions';

class LoginActions {
  constructor() {
    this.generateActions(
      'updateUsername',
      'updatePassword',
      'loginSuccess',
      'loginFail'
    );
  }

  login(payload) {
    ajax()
    .post('/api/login', {
      username: payload.username,
      password: payload.password
    })
    .done((user) => {
      this.actions.loginSuccess(payload);
      AppActions.fetchUser(user._id);
    })
    .fail((jqXhr) => {
      this.actions.loginFail(jqXhr);
    });
  }
}

export default alt.createActions(LoginActions);
