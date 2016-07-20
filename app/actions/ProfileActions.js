import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'updateProfile'
    );
  }
}

export default alt.createActions(ProfileActions);
