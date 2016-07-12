import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import RoomList from './components/RoomList';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/rooms' handler={RoomList} />
  </Route>
)
