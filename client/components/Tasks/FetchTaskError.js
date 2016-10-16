import React, { PropTypes } from 'react';

import styles from './styles.css';

const FetchTaskError = ({ error }) => (
  <div className='row middle-xs text-center full-height'>
    <div className='col-xs-12'>
      <p className={styles.fetchError}>
        {error.taskFetchError &&
          error.taskFetchError.message
          || 'Something bad happened.'
        }
      </p>
    </div>
  </div>
);

FetchTaskError.propTypes = {
  error: PropTypes.object.isRequired
};

export default FetchTaskError;
