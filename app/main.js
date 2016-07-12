import React from 'react';
import Router from 'react-router';
import routes from './routes';


Router.run(routes, Router.HistoryLocation, function(App) {
  React.render(<App />, document.getElementById('app'));
})
