import R from 'ramda';

/**
 * Given a predicate function, two components and an an array of conditions,
 * return the component for which the predicate function is true.
 *
 * The predicate function defaults to asserting that every condition in
 * the array is true.
 */
export const getComponent = R.curry((
  first, other, args, predicate = xs => xs.every(Boolean)
) => (predicate(args) ? first : other));

/**
 * Convert
 * {
     name: 'task',
     user: {
       firstName: 'test',
       lastName: 'user'
     }
   }
  * into
  * {
      name: 'task',
      user: 'test user'
  * }
  *
 */
const getNames = R.props(['firstName', 'lastName']);
export const replaceUserWithNames = task => R.set(
  R.lensProp('user'),
  R.compose(R.join(' '), getNames, R.prop('user'))(task), task);

/**
 * Convert a date string into another date string utilizing the given
 * date function.
 * e.g.
 * humanizeDate('toLocaleDateString', 'createdAt', {
     createdAt: '2016-11-12T08:57:22.369Z'
   })
 * result:
   {
     createdAt: "11/12/2016"
   }
 */
export const humanizeDate = R.curry((dateFunc, field, obj) => R.set(
  R.lensProp(field),
  new Date(R.prop(field, obj))[dateFunc](),
  obj
));

export const toLocaleDateString = humanizeDate('toLocaleDateString');
export const toLocaleTimeString = humanizeDate('toLocaleTimeString');
