import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import RoomList from './components/RoomList';
import Room from './components/Room';
import Profile from './components/Profile';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/rooms' handler={RoomList} />
    <Route path='/rooms/:id' handler={Room} />
    <Route path='/profile' handler={Profile} />
  </Route>
)
