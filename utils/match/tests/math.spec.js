'use strict';

const match = require('..');

describe('should test match function for value 4 and function x * 2', () => {
  describe('should test function called on', () => {
    const result = match(4)
      .on(
        (x) => x < 3,
        () => 0
      )
      .otherwise((x) => x * 2);

    it('result should not to be empty', () => {
      expect.assertions(4);

      expect(result).toBeDefined();
      expect(result).not.toBe('');
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
    });

    it('result should not be different than 8', () => {
      expect.assertions(2);

      expect(result).not.toBeLessThan(8);
      expect(result).not.toBeGreaterThan(8);
    });

    it('result should not equal 3', () => {
      expect.assertions(1);

      expect(result).not.toBe(3);
    });

    it('result should equal 8', () => {
      expect.assertions(1);

      expect(result).toBe(8);
    });
  });

  describe('should test function called othervise', () => {
    const result = match(4)
      .on(
        (x) => x < 5,
        () => 0
      )
      .otherwise((x) => x * 2);

    it('result should not to be empty', () => {
      expect.assertions(4);

      expect(result).toBeDefined();
      expect(result).not.toBe('');
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
    });

    it('result should not be different than 8', () => {
      expect.assertions(2);

      expect(result).not.toBeLessThan(0);
      expect(result).not.toBeGreaterThan(0);
    });

    it('result should not equal 3', () => {
      expect.assertions(1);

      expect(result).not.toBe(3);
    });

    it('result should equal 0', () => {
      expect.assertions(1);

      expect(result).toBe(0);
    });
  });
});
