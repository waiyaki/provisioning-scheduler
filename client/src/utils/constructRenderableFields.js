import { decamelize } from 'humps';

export function titleCase(str) {
  return str.split(' ').map(
    string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  ).join(' ');
}

export function constructRenderableFields(fields = []) {
  if (!Array.isArray(fields)) {
    throw new Error(`Expected an array of field objects, got ${fields}`);
  }

  return fields.map(field => ({
    ...field,
    type: field.type || 'text',
    hintText: field.hintText || titleCase(decamelize(
      field.name, { separator: ' ' }
    ))
  }));
}
