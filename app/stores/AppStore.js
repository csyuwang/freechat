import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.user = null;
  }

  onFetchUserSuccess(user) {
    this.user = user;
  }

  onFetchUserFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(AppStore);
