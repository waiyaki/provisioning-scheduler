import React from 'react';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage/LandingPage';
import UnverifiedAccountContainer from './UnverifiedAccountContainer';

export default function requireAuthentication(Component) {
  class WrapperComponent extends React.Component {
    componentWillReceiveProps(nextProps) {
      const { auth } = this.props;
      const { auth: nextAuth } = nextProps;
      if (auth.isAuthenticated !== nextAuth.isAuthenticated) {
        this.forceUpdate();
      }
    }

    render() {
      const { auth } = this.props;

      if (!auth.isAuthenticated) {
        return <LandingPage />;
      } else if (auth.isAuthenticated && auth.user.isPending) {
        return <UnverifiedAccountContainer />;
      }
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { auth } = state;

    return {
      auth
    };
  };

  WrapperComponent.propTypes = {
    auth: React.PropTypes.object
  };

  return connect(mapStateToProps)(WrapperComponent);
}
