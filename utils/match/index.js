'use strict';

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x
});

const match = x => ({
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x)
});

module.exports = match;

/**
 * * https://medium.com/@hariseldon78/heres-a-version-with-some-typescript-types-added-cc08a95928fd
 */
