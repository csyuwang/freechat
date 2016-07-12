import alt from '../alt';

class NavBarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers'
    );
  }
}

export default alt.createActions(NavBarActions);
