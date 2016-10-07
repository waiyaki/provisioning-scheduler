import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import TimePicker from 'material-ui/TimePicker';
import inlineStyles from './inlineStyles';

export const validate = requiredFields => values => {
  const errors = {};
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required.';
    }
  });

  return errors;
};

export const renderFormFields = (
  formFields, scheduler
) => formFields.map((field, index) => (
  <span key={index}>
    <Field
      {...field}
      errorStyle={inlineStyles.errorStyle}
      errorText={scheduler.error && scheduler.error[field.name]}
      floatingLabelText={field.hintText}
      fullWidth
      component={TextField}
    />
  </span>
));

export const renderTimePicker = ({
  // eslint-disable-next-line react/prop-types
  label, meta, input
}) => (
  <TimePicker
    fullWidth
    hintText={label}
    format='24hr'
    floatingLabelText={label}
    errorText={meta.touched && meta.error}
    onChange={(_, date) => input.onChange(date)}
    value={input.value}
  />
);
