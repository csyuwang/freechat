import React from 'react';
import { RouteHandler } from 'react-router';
import NavBar from './NavBar';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <RouteHandler />
        <Footer />
      </div>
    )
  }
}

export default App;
