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

const TaskForm = ({
  handleSubmit, onSubmit, submitting, pristine, tasks
}) => {
  const { error: { submissionError } } = tasks;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submissionError && submissionError.message && (
        <div className={styles.error}>{submissionError.message}</div>
      )}
      <div className='row text-center'>
        <div className='col-xs-12 col-md-6'>
          {renderFormFields(firstHalf, tasks)}
        </div>
        <div className='col-xs-12 col-md-6'>
          {renderFormFields(otherHalf, tasks)}
          <span key='time'>
            <Field
              name='time'
              label='Time'
              errorText={submissionError && submissionError.time}
              component={renderTimePicker}
            />
          </span>
        </div>
      </div>
      <div className='text-center'>
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
};

TaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  tasks: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'TaskForm',
  validate: validate(without(rawFields, 'engineer', 'engineersPhoneNumber'))
})(TaskForm);
