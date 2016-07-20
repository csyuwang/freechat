import React from 'react';
import { Link } from 'react-router';
import LobbyActions from '../actions/LobbyActions';
import LobbyStore from '../stores/LobbyStore';

class Lobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = LobbyStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LobbyStore.listen(this.onChange);
    LobbyActions.fetchRooms();
  }

  componentWillUnmount() {
    LobbyStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var roomname = this.state.roomname.trim();

    if(!roomname) {

    } else {
      LobbyActions.createRoom(roomname, this.props.user.name);
    }
  }

  render() {

    var roomList = [
      {'id':1, 'name':'JavaScript从入门到放弃', 'onlineUsers':2241},
      {'id':2, 'name':'函数式编程从入门到懵逼', 'onlineUsers':4254},
      {'id':3, 'name':'感受大蟒蛇的力量吧', 'onlineUsers':321},
      {'id':4, 'name':'社会主义大锤', 'onlineUsers':423},
      {'id':5, 'name':'全场最渣', 'onlineUsers':1123},
      {'id':6, 'name':'天降正义', 'onlineUsers':442},
      {'id':7, 'name':'满脑子都是那些骚操作', 'onlineUsers':30},
      {'id':8, 'name':'买买买！', 'onlineUsers':674},
      {'id':9, 'name':'随缘', 'onlineUsers':808},
      {'id':10, 'name':'66666', 'onlineUsers':30}];
    var tagList = [
      {'id':1, 'name':'Tag1','count':10,'likes':7232},
      {'id':2, 'name':'Tag2','count':8,'likes':1234},
      {'id':3, 'name':'Tag3','count':23,'likes':4257},
      {'id':4, 'name':'Tag4','count':15,'likes':3346},
      {'id':5, 'name':'Tag5','count':22,'likes':8997},
      {'id':6, 'name':'Tag6','count':33,'likes':2344},
      {'id':7, 'name':'Tag7','count':55,'likes':1233}
    ];

    var rooms = this.state.rooms.map((room) => {
      return (
        <Link key={room._id} to={'/lobby/' + room._id}>
          <div className='col-md-3 col-sm-4 col-xs-6 room-panel'>
            <div className='room-name'><span>{ room.name }</span></div>
            <div className='room-users'><span>create by <strong>{ room.creator }</strong></span></div>
          </div>
        </Link>
      );
    });

    var tags = tagList.map((tag) => {
      return (
        <a key={tag.id} href="#" className="list-group-item">
          <h4 className="list-group-item-heading">{ tag.name }</h4>
          <p className="list-group-item-text">
            <span className="glyphicon glyphicon-list" aria-hidden="true"></span> {tag.count} <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {tag.likes}
          </p>
        </a>
      );
    });

    return (
      <div className='container'>
        <div className='row'>
            <div className='col-sm-9'>
              <div className='row'>
                { rooms }
              </div>
            </div>
            <div className='col-sm-3 hidden-xs'>
              <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Type a room name" value={this.state.roomname} onChange={LobbyActions.updateRoomname} />
                </div>
                <button type="submit" className="btn btn-default">Create Room</button>
              </form>
              <div className="list-group">
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Lobby;
