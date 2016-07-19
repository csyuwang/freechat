import React from 'react';

class Profile extends React.Component {

  render() {
    return (
      <div>
        {this.props.user.name}
      </div>
    )
  }
}

export default Profile;
