import { curry } from 'ramda';

export * from './form-helpers';
export * from './localstorage';

/**
 * Given a predicate function, two components and an an array of conditions,
 * return the component for which the predicate function is true.
 *
 * The predicate function defaults to asserting that every condition in
 * the array is true.
 */
export const getComponent = curry((
  first, other, args, predicate = xs => xs.every(Boolean)
) => (predicate(args) ? first : other));
