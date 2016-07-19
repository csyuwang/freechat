import alt from '../alt';
import ajax from '../utils/ajax';

class AppActions {
  constructor() {
    this.generateActions(
      'fetchUserSuccess',
      'fetchUserFail'
    );
  }

  fetchUser(userId) {
    ajax()
    .get('/api/fetchUser', {
      userId: userId
    })
    .done((user) => {
      this.actions.fetchUserSuccess(user);
      localStorage.userId = userId;
    })
    .fail((jqXhr) => {
      this.actions.fetchUserFail(jqXhr);
    });
  }

}

export default alt.createActions(AppActions);
