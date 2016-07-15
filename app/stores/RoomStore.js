import alt from '../alt';
import RoomActions from '../actions/RoomActions';

class RoomStore {
  constructor() {
    this.bindActions(RoomActions);
    this.messages = [];
    this.message = '';
  }

  onUpdateMessages(msg) {
    this.messages.push(msg);
  }

  onUpdateMessage(event) {
    this.message = event.target.value;
  }

  onSendMessage() {
    this.message = '';
  }
}

export default alt.createStore(RoomStore);
