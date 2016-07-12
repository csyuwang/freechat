import alt from '../alt';
import NavBarActions from '../actions/NavBarActions';

class NavBarStore {
  constructor() {
    this.bindActions(NavBarActions);
    this.onlineUsers = 0;
  }
  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }
}

export default alt.createStore(NavBarStore);
