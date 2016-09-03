import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import UnverifiedAccount from '../../components/Auth/UnverifiedAccount';
import { verifyToken } from '../../actions/authActions';

class UnverifiedAccountContainer extends React.Component {
  constructor(props) {
    super(props);

    this.shouldWeRedirect = this.shouldWeRedirect.bind(this);
  }

  componentDidMount() {
    if (this.shouldWeRedirect(this.props)) {
      browserHistory.push('/');
    } else {
      const { params } = this.props;
      if (params && params.token) {
        this.props.verifyToken(params.token)
          .then(() => browserHistory.push('/'))
          .catch(() => { /* Noop */ });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && this.shouldWeRedirect(nextProps)) {
      browserHistory.push('/');
    }
  }

  shouldWeRedirect({ user, params }) {
    if (params && params.token) {
      return false;
    }
    return user && !user.isPending;
  }

  render() {
    const { user, isFetching, params } = this.props;
    return (
      <UnverifiedAccount user={user} isFetching={isFetching} params={params} />
    );
  }
}

UnverifiedAccountContainer.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
  verifyToken: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, isFetching } = state.auth;
  return {
    user,
    isFetching
  };
};

export default connect(mapStateToProps, {
  verifyToken
})(UnverifiedAccountContainer);
