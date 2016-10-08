import React from 'react';
import { browserHistory } from 'react-router';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './landingPageInlineStyles';

const LandingPage = () => (
  <div className='row text-center'>
    <div className='col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4'>
      <Card className='text-center'>
        <CardTitle
          title='Provisioning Scheduler'
          titleStyle={styles.titleStyles}
        />
        <Divider />
        <CardText style={styles.cardTextStyles}>
          <p>Hey there!</p>
          <p>In order for you to proceed, you'll need to log in.</p>
          <RaisedButton primary onClick={() => browserHistory.push('/login')}>
            Login
          </RaisedButton> <br />
          <p style={styles.notRegistered}>
            Not registered yet?
          </p>
          <RaisedButton onClick={() => browserHistory.push('/register')}>
            Register
          </RaisedButton>
        </CardText>
      </Card>
    </div>
  </div>
);

export default LandingPage;
