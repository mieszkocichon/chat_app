'use strict';

const PerformanceStats = require('..');

describe('should test system performance function', () => {
  const { elapTimeMS, elapUserMS, elapSystMS, cpuPercent } = PerformanceStats;

  describe('should test elapTimeMS', () => {
    it('elapTimeMS should not to be empty', () => {
      expect.assertions(4);

      expect(elapTimeMS).toBeDefined();
      expect(elapTimeMS).not.toBe('');
      expect(elapTimeMS).not.toBeNull();
      expect(elapTimeMS).not.toBeUndefined();
    });
  });

  describe('should test elapUserMS', () => {
    it('elapUserMS should not to be empty', () => {
      expect.assertions(4);

      expect(elapUserMS).toBeDefined();
      expect(elapUserMS).not.toBe('');
      expect(elapUserMS).not.toBeNull();
      expect(elapUserMS).not.toBeUndefined();
    });
  });

  describe('should test elapSystMS', () => {
    it('elapSystMS should not to be empty', () => {
      expect.assertions(4);

      expect(elapSystMS).toBeDefined();
      expect(elapSystMS).not.toBe('');
      expect(elapSystMS).not.toBeNull();
      expect(elapSystMS).not.toBeUndefined();
    });
  });

  describe('should test cpuPercent', () => {
    it('cpuPercent should not to be empty', () => {
      expect.assertions(4);

      expect(cpuPercent).toBeDefined();
      expect(elapUserMS).not.toBe('');
      expect(cpuPercent).not.toBeNull();
      expect(cpuPercent).not.toBeUndefined();
    });

    it('cpuPercent should be a percentage value', () => {
      expect.assertions(2);

      expect(~~cpuPercent).toBeLessThan(100);
      expect(~~cpuPercent).toBeGreaterThan(-1);
    });
  });
});
