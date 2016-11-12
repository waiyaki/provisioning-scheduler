import { curry, compose, pickBy, is, keys, reduce, flip } from 'ramda';

const intoHalves = xs => ({
  firstHalf: xs.slice(0, xs.length / 2 + 1),
  secondHalf: xs.slice(xs.length / 2 + 1)
});

/**
 * halves - Accept and object and extract an array of it's string keys. Return
 * an object with the keys divided into two (almost always) equal parts under
 * the keys `firstHalf` and `secondHalf`.
 */
export const halves = compose(intoHalves, keys, pickBy(is(String)));

/**
 * transform(task, { renderAs, fields })
 *
 * transform - Accept a task and an object with a single transform function
 * and fields to apply that transform against.
 *
 * Return the transformed task.
 */
export const transform = curry((task, { renderAs, fields }) => fields.reduce(
  (t, field) => Object.assign({}, t, {
    [field]: renderAs(task[field])
  }),
  task
));

/**
 * transformTask(transforms, task)
 *
 * Take in an array of transforms and the `task` to transform and return the
 * transformed task.
 *
 * Each transform should have the shape { renderAs, fields } where `renderAs`
 * is the function that will be called against every value `task[field]`
 * for field in `fields`.
 */
export const transformTask = flip(reduce(transform));
