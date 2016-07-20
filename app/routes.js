import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Lobby from './components/Lobby';
import Room from './components/Room';
import Profile from './components/Profile';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/lobby' handler={Lobby} />
    <Route path='/lobby/:id' handler={Room} />
    <Route path='/profile' handler={Profile} />
  </Route>
)
