import React from 'react';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from '../stores/ProfileStore';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      profile: this.props.user
    });
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.user
    });
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        { this.state.profile && this.state.profile.name }
      </div>
    )
  }
}

export default Profile;
