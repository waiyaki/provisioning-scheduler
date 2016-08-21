import React from 'react';

export default function authContainer(LoginOrRegisterComponent) {
  return class AuthContainerWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
      this.setState(...this.state, {
        [event.target.name]: event.target.value.trim()
      });
    }

    handleSubmit() {
      console.log(this.state);
    }

    render() {
      return (
        <LoginOrRegisterComponent
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
}
