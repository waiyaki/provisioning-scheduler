import R from 'ramda';

const getNames = R.props(['firstName', 'lastName']);
export const replaceUserWithNames = task => R.set(
  R.lensProp('user'),
  R.compose(R.join(' '), getNames, R.prop('user'))(task), task);

export const humanizeDate = R.curry((dateFunc, field, obj) => R.set(
  R.lensProp(field),
  new Date(R.prop(field, obj))[dateFunc](),
  obj
));

export const toLocaleDateString = humanizeDate('toLocaleDateString');
export const toLocaleTimeString = humanizeDate('toLocaleTimeString');
