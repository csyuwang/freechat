import React from 'react';
import { RouteHandler } from 'react-router';
import NavBar from './NavBar';
import Footer from './Footer';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);
    if(localStorage.userId) {
      AppActions.fetchUser(localStorage.userId);
    }
  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <RouteHandler user={this.state.user} />
        <Footer />
      </div>
    )
  }
}

export default App;
