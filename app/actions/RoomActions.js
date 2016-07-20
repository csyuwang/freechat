import alt from '../alt';
import ajax from '../utils/ajax';

class RoomActions {
  constructor() {
    this.generateActions(
      'updateMessages',
      'updateMessage',
      'sendMessage',
      'fetchMessagesSuccess',
      'fetchMessagesFail'
    );
  }

  fetchMessages(roomId, count) {
    ajax()
    .get('/api/fetchMessages', {
      roomId: roomId,
      count: count
    })
    .done((messages) => {
      this.actions.fetchMessagesSuccess(messages);
    })
    .fail((jqXhr) => {
      this.actions.fetchMessagesFail(jqXhr);
    });
  }

}

export default alt.createActions(RoomActions);
