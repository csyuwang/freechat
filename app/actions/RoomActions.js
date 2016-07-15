import alt from '../alt';

class RoomActions {
  constructor() {
    this.generateActions(
      'updateMessages',
      'updateMessage',
      'sendMessage'
    );
  }
}

export default alt.createActions(RoomActions);
