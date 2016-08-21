import React from 'react';
import { browserHistory } from 'react-router';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const titleStyles = {
  fontSize: '2em'
};

const cardTextStyles = {
  fontSize: '1.2em'
};

const LandingPage = () => (
  <div className='row'>
    <div className='col-xs col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4'>
      <div className='box'>
        <Card className='text-center'>
          <CardTitle
            title='Provisioning Scheduler'
            titleStyle={titleStyles}
          />
          <CardText style={cardTextStyles}>
            <p>Hey there!</p>
            <p>In order for you to proceed, you'll need to log in.</p><br />
            <RaisedButton primary onClick={() => browserHistory.push('/login')}>
              Login
            </RaisedButton><br /><br />
            <p style={{ fontSize: '0.8em', marginBottom: '0.6em' }}>
              Not registered yet?
            </p>
            <RaisedButton onClick={() => browserHistory.push('/register')}>
              Register
            </RaisedButton>
          </CardText>
        </Card>
      </div>
    </div>
  </div>
);

export default LandingPage;
