import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { constructRenderableFields } from '../../utils';

import authContainerHOC from '../../containers/AuthContainer/authContainerHOC';

const styles = {
  cardTitle: {
    fontSize: '2em'
  },
  cardText: {
    margin: '0 10%'
  }
};

const fields = [{
  name: 'firstName'
}, {
  name: 'lastName'
}, {
  name: 'username'
}, {
  name: 'email',
  type: 'email'
}, {
  name: 'password',
  type: 'password'
}, {
  name: 'confirmPassword',
  type: 'password'
}];

const Register = (props) => (
  <div className='row'>
    <div className='col-xs col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4'>
      <div className='box'>
        <Card>
          <CardTitle
            className='text-center'
            title='Register'
            titleStyle={styles.cardTitle}
          />
          <Divider />
          <CardText style={styles.cardText}>
            {constructRenderableFields(fields).map((field, index) => (
              <span key={index}>
                <TextField
                  {...field}
                  fullWidth
                  onChange={props.handleInputChange}
                /> <br />
              </span>
            ))}
            <RaisedButton onClick={props.handleSubmit} primary>
              Register
            </RaisedButton>
          </CardText>
        </Card>
      </div>
    </div>
  </div>
);

Register.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default authContainerHOC(Register);
