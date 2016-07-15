import React from 'react';
import RoomActions from '../actions/RoomActions';
import RoomStore from '../stores/RoomStore';
import SocketService from '../SocketService';

class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = RoomStore.getState();
    this.onChange = this.onChange.bind(this);
    console.log('constructor');
  }

  componentDidMount() {
    RoomStore.listen(this.onChange);
    SocketService.emit('join', {'userId': 1, 'roomId': this.props.params.id});
    SocketService.on('new message', (msg) => {
      RoomActions.updateMessages(msg);
    })
  }

  componentWillUnmount() {
    SocketService.emit('leave', {'userId': 1, 'roomId': this.props.params.id});
    SocketService.removeAllListeners('new message');
    RoomStore.unlisten(this.onChange);
  }

  handleSend(event) {
    event.preventDefault();
    SocketService.emit('message', {'userId': 1, 'roomId': this.props.params.id, 'content':this.state.message });
    RoomActions.sendMessage();
  }

  onChange(state) {
    this.setState(state);
  }

  render() {


    var messages = this.state.messages.map((msg) => {
      return (
        <div className="list-group-item message">
            { msg.content }
        </div>
      );
    });

    return (

      <div className='container'>
        <div className='row'>
            <div className='col-sm-9'>
              <div className="panel panel-default room">
                <div className="panel-heading room-header">TechNode</div>
                <div className="panel-body room-content">
                    <div className="list-group messages">
                      {messages}
                    </div>
                    <div className="input-group message-send-box">
                      <input type="text" className="form-control" placeholder="Say something..." value={this.state.message} onChange={RoomActions.updateMessage} />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.handleSend.bind(this)}>Send</button>
                      </span>
                    </div>
                </div>
              </div>
            </div>
            <div className='col-sm-3 hidden-xs'>
            </div>
        </div>
      </div>
    )
  }
}

Room.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Room;
