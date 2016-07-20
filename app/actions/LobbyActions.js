import alt from '../alt';
import ajax from '../utils/ajax';

class LobbyActions {
  constructor() {
    this.generateActions(
      'updateRoomname',
      'fetchRoomsSuccess',
      'fetchRoomsFail',
      'createRoomSuccess',
      'createRoomFail'
    );
  }

  fetchRooms() {
    ajax()
    .get('/api/fetchRooms', {})
    .done((rooms) => {
      this.actions.fetchRoomsSuccess(rooms);
    })
    .fail((jqXhr) => {
      this.actions.fetchRoomsFail(jqXhr);
    })
  }

  createRoom(roomname, username) {
    ajax()
    .post('/api/createRoom', {
      roomname: roomname,
      username: username,
    })
    .done((room) => {
      this.actions.createRoomSuccess(room);
    })
    .fail((jqXhr) => {
      this.actions.createRoomFail(jqXhr);
    });
  }

}

export default alt.createActions(LobbyActions);
