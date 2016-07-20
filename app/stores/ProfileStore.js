import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.profile = null;
  }
  onUpdateProfile(profile) {
    this.profile = profile;
  }
}

export default alt.createStore(ProfileStore);
