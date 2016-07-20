import React from 'react';
import RoomActions from '../actions/RoomActions';
import RoomStore from '../stores/RoomStore';
import SocketService from '../SocketService';

class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = RoomStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RoomStore.listen(this.onChange);
    RoomActions.fetchMessages(this.props.params.id, 20);
    SocketService.emit('join', {'userId': localStorage.userId, 'username': this.props.user && this.props.user.name, 'roomId': this.props.params.id});
    SocketService.on('new message', (msg) => {
      RoomActions.updateMessages(msg);
    })
    var element = $(this.refs.messages.getDOMNode());
    element.animate({
      scrollTop: element.prop('scrollHeight')
    }, 1000);
  }

  componentWillUnmount() {
    SocketService.emit('leave', {'userId': this.props.user._id, 'username': this.props.user.name, 'roomId': this.props.params.id});
    SocketService.removeAllListeners('new message');
    RoomStore.unlisten(this.onChange);
  }

  handleSend(event) {
    event.preventDefault();
    SocketService.emit('message', {'userId': this.props.user._id, 'username': this.props.user.name, 'roomId': this.props.params.id, 'content':this.state.message });
    RoomActions.sendMessage();
  }

  onChange(state) {
    this.setState(state);
  }



  render() {
    var messages = this.state.messages.map((msg) => {
      return (
        <div className="list-group-item message">
            <a>{msg.creator}</a>: { msg.content }
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
                    <div className="list-group messages" ref='messages' >
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
