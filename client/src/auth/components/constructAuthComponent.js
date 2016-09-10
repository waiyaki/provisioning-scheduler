import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { titleCase, constructRenderableFields } from '../../utils';

const styles = {
  cardTitle: {
    fontSize: '2em'
  },
  cardText: {
    margin: '0 10%'
  }
};

export default function constructAuthComponent(authComponentName, fields) {
  const componentName = titleCase(authComponentName);
  const constructedFunction = {
    [componentName](props) {
      return (
        <div className='row'>
          <div className='col-xs col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4'>
            <div className='box'>
              <Card>
                <CardTitle
                  className='text-center'
                  title={componentName}
                  titleStyle={styles.cardTitle}
                />
                <Divider />
                <CardText style={styles.cardText}>
                  {constructRenderableFields(fields).map((field, index) => (
                    <span key={index}>
                      <TextField
                        {...field}
                        errorText={props.errors[field.name]}
                        fullWidth
                        onChange={props.handleInputChange}
                      /> <br />
                    </span>
                  ))}
                  <RaisedButton
                    onClick={
                      // eslint-disable-next-line react/prop-types
                      () => props.handleSubmit(componentName.toLowerCase())
                    }
                    primary
                  >
                    {componentName}
                  </RaisedButton>
                </CardText>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  };

  return constructedFunction[componentName];
}
