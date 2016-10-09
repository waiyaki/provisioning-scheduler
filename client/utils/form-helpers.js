import { decamelize } from 'humps';
import { compose, curry } from 'ramda';

export function titleCase(str) {
  return str.split(' ').map(
    string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  ).join(' ');
}

export const titleCaseAndDecamelize = compose(
  titleCase,
  curry((opts, s) => decamelize(s, opts))({ separator: ' ' })
);

export function constructRenderableFields(fields = []) {
  if (!Array.isArray(fields)) {
    throw new Error(`Expected an array of field objects, got ${fields}`);
  }

  return fields.map(field => ({
    ...field,
    type: field.type || 'text',
    hintText: field.hintText || titleCaseAndDecamelize(field.name)
  }));
}

export const requireFields = requiredFields => values => {
  const errors = {};
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required.';
    }
  });

  return errors;
};
