'use strict';

const FuseStateObject = require('../FuseStateObject');
const Fuse = require('..');

describe('should test fuse performance system', () => {
  describe('should test fuseState object', () => {
    it('fuseStateObject should not be empty', () => {
      expect.assertions(4);

      expect(FuseStateObject).toBeDefined();
      expect(FuseStateObject).not.toBe('');
      expect(FuseStateObject).not.toBeNull();
      expect(FuseStateObject).not.toBeUndefined();
    });

    it('fuseStateObject should consist three state', () => {
      expect.assertions(4);

      const FuseStateObjectParsedTemp = {
        OPEN: 'open',
        SELF_OPEN: 'self_open',
        CLOSE: 'close',
      };

      expect(FuseStateObject).toStrictEqual(FuseStateObjectParsedTemp);
      expect(FuseStateObject.OPEN).toStrictEqual(
        FuseStateObjectParsedTemp.OPEN
      );
      expect(FuseStateObject.SELF_OPEN).toStrictEqual(
        FuseStateObjectParsedTemp.SELF_OPEN
      );
      expect(FuseStateObject.CLOSE).toStrictEqual(
        FuseStateObjectParsedTemp.CLOSE
      );
    });

    it('fuseStateObject should not constst of three state', () => {
      expect.assertions(3);

      expect('open').not.toStrictEqual('FuseStateObjectParsedTemp.OPEN');
      expect('self_open').not.toStrictEqual(
        'FuseStateObjectParsedTemp.SELF_OPEN'
      );
      expect('close').not.toStrictEqual('FuseStateObjectParsedTemp.CLOSE');
    });
  });

  describe('should test fuse pattern', () => {
    expect.assertions(1);

    const fuseDefaultConstructor = new Fuse({});
    const fuseWitchDetailsConstructor = new Fuse({ low: 40, hight: 70 });

    describe('shoult return fuse state open as default', () => {
      expect.assertions(2);

      it('with default constructor', () => {
        expect.assertions(2);

        const systemStateOfFuseDefaultConstructor = fuseDefaultConstructor.getSystemState();

        expect(systemStateOfFuseDefaultConstructor).toStrictEqual(
          FuseStateObject.OPEN
        );
        expect(systemStateOfFuseDefaultConstructor).not.toStrictEqual(
          FuseStateObject.CLOSE
        );
      });

      it('without default constructor', () => {
        expect.assertions(2);

        const systemStateOfFuseConstructorWitchDetails = fuseWitchDetailsConstructor.getSystemState();

        expect(systemStateOfFuseConstructorWitchDetails).toStrictEqual(
          FuseStateObject.OPEN
        );
        expect(systemStateOfFuseConstructorWitchDetails).not.toStrictEqual(
          FuseStateObject.CLOSE
        );
      });
    });

    describe('should return right low quantities', () => {
      expect.assertions(2);

      it('with default constructor', () => {
        expect.assertions(2);

        const lowValueOfFuseObjectWitchDefaultConstructor = fuseDefaultConstructor.getLow();

        expect(lowValueOfFuseObjectWitchDefaultConstructor).toBe(70);
        expect(lowValueOfFuseObjectWitchDefaultConstructor).not.toBe(10);
      });

      it('without default constructor', () => {
        expect.assertions(2);

        const lowValueOfFuseObjectWitchQuantitiesConstructor = fuseWitchDetailsConstructor.getLow();

        expect(lowValueOfFuseObjectWitchQuantitiesConstructor).toBe(40);
        expect(lowValueOfFuseObjectWitchQuantitiesConstructor).not.toBe(10);
      });
    });

    it('should return right hight quantities', () => {
      expect.assertions(2);

      const hightValueOfFuseObjectWitchDefaultConstructor = fuseDefaultConstructor.getHight();
      const hightValueOfFuseObjectWitchQuantitiesConstructor = fuseWitchDetailsConstructor.getHight();

      expect(hightValueOfFuseObjectWitchDefaultConstructor).toBe(90);
      expect(hightValueOfFuseObjectWitchQuantitiesConstructor).toBe(70);
    });

    describe('should test taskManager function', () => {
      expect.assertions(2);

      const FuseStateObject = {
        OPEN: 'open',
        SELF_OPEN: 'self_open',
        CLOSE: 'close',
      };

      describe('attemptsQuantity value is negative value', () => {
        expect.assertions(2);

        it('should return warning for -1 attemptsQuantity value', () => {
          expect.assertions(2);

          const result = Fuse.taskManager({
            state: FuseStateObject.OPEN,
            task: () => void 0,
            attemptsQuantity: -1,
          });

          expect(result).toStrictEqual({
            message: 'error',
            status: -1,
          });
          expect(result).not.toStrictEqual({
            message: 'success',
            status: 0,
          });
        });
        it('should return warning for 11 attemptsQuantity value', () => {
          expect.assertions(2);

          const result = Fuse.taskManager({
            state: FuseStateObject.OPEN,
            task: () => void 0,
            attemptsQuantity: 11,
          });

          expect(result).toStrictEqual({
            message: 'error',
            status: -1,
          });
          expect(result).not.toStrictEqual({
            message: 'success',
            status: 0,
          });
        });
      });

      describe('test open state', () => {
        expect.assertions(2);

        it('open state', () => {
          expect.assertions(2);

          const result = Fuse.taskManager({
            state: FuseStateObject.OPEN,
            task: () => void 0,
          });

          expect(result).not.toStrictEqual({
            message: 'error',
            satus: -1,
          });
          expect(result).toStrictEqual({
            message: 'success',
            status: 0,
          });
        });

        it('close state', () => {
          expect.assertions(2);

          const result = Fuse.taskManager({
            state: FuseStateObject.CLOSE,
            task: () => void 0,
          });

          expect(result).toStrictEqual({
            message: 'error',
            satus: -1,
          });
          expect(result).not.toStrictEqual({
            message: 'success',
            status: 0,
          });
        });
      });
    });
  });
});
