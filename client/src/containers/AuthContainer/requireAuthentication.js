import React from 'react';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage/LandingPage';

export default function RequireAuthentication(Component) {
  function WrapperComponent(props) {
    const { auth } = props;

    if (!auth.isAuthenticated) {
      return <LandingPage />;
    }

    return <Component {...props} />;
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
