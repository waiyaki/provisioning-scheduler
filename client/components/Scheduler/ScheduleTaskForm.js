import React, { PropTypes } from 'react';
import without from 'lodash/without';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { constructRenderableFields } from '../../utils';
import { renderFormFields, renderTimePicker, validate } from './formHelpers';
import styles from './styles.css';

const rawFields = [
  'partner',
  'engineer',
  'engineersPhoneNumber',
  'contactPerson',
  'contactPersonsPhoneNumber',
  'town',
  'siteName',
  'activity',
  'circuitId',
  'medium',
  'projectManager'
];

const fields = constructRenderableFields(
  rawFields.map(name => ({ name }))
);

const firstHalf = fields.slice(0, fields.length / 2 + 1);
const otherHalf = fields.slice(fields.length / 2 + 1);

const ScheduleTaskForm = ({
  handleSubmit, onSubmit, submitting, pristine, tasks
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    {tasks.error && tasks.error.message && (
      <div className={styles.error}>{tasks.error.message}</div>
    )}
    <div className='row text-xs-center'>
      <div className='col-xs-12 col-md-6'>
        {renderFormFields(firstHalf, tasks)}
      </div>
      <div className='col-xs-12 col-md-6'>
        {renderFormFields(otherHalf, tasks)}
        <span key='time'>
          <Field
            name='time'
            label='Time'
            errorText={tasks.error && tasks.error.time}
            component={renderTimePicker}
          />
        </span>
      </div>
    </div>
    <div className='text-xs-center'>
      {submitting
        ? <CircularProgress size={0.5} />
        : <div className={styles.submit}>
          <RaisedButton disabled={pristine} type='submit' primary>
            Submit
          </RaisedButton>
        </div>
      }
    </div>
  </form>
);

ScheduleTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  tasks: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'ScheduleTaskForm',
  validate: validate(without(rawFields, 'engineer', 'engineersPhoneNumber')),
  initialValues: {
    time: new Date()
  }
})(ScheduleTaskForm);
