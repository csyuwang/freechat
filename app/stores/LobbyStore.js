import alt from '../alt';
import LobbyActions from '../actions/LobbyActions';

class LobbyStore {
  constructor() {
    this.bindActions(LobbyActions);
    this.rooms = [];
    this.roomname = '';
  }

  onUpdateRoomname(event) {
    this.roomname = event.target.value;
  }

  onFetchRoomsSuccess(rooms) {
    this.rooms = rooms;
  }

  onFetchRoomsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateRoomSuccess(room) {
    this.rooms.push(room);
    this.roomname = '';
  }

  onCreateRoomFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(LobbyStore);
