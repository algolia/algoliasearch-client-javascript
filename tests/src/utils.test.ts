import {
  capitalize,
  checkIfLanguageExists,
  createClientName,
  removeEnumType,
  removeObjectName,
} from './utils';

describe('utils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toEqual('Hello');
      expect(capitalize('Hello')).toEqual('Hello');
    });

    it('should only capitalize first letter', () => {
      expect(capitalize('hello wolrd')).toEqual('Hello wolrd');
      expect(capitalize('Hello wolrd')).toEqual('Hello wolrd');
    });

    it('should not affect other character', () => {
      expect(capitalize('8Hello')).toEqual('8Hello');
      expect(capitalize('<hello>')).toEqual('<hello>');
    });
  });

  describe('createClientName', () => {
    it('capitalize every part', () => {
      expect(createClientName('search')).toEqual('SearchApi');
      expect(createClientName('search-client')).toEqual('SearchClientApi');
      expect(createClientName('search-cli!nt-complex')).toEqual(
        'SearchCli!ntComplexApi'
      );
    });
  });

  describe('removeObjectName', () => {
    it('should remove simple $objectName from root', () => {
      expect(removeObjectName({ $objectName: 'test', key: 'val' })).toEqual({
        key: 'val',
      });
    });

    it('should remove $objectName in nested objects', () => {
      expect(
        removeObjectName({
          $objectName: 'test',
          key: { $objectName: 'other', otherKey: 'val2' },
        })
      ).toEqual({
        key: { otherKey: 'val2' },
      });
    });

    it('should remove $objectName in arrays', () => {
      expect(
        removeObjectName({
          $objectName: 'test',
          arr: [{ $objectName: 'other', otherKey: 'val2' }, '$objectName'],
        })
      ).toEqual({
        arr: [{ otherKey: 'val2' }, '$objectName'],
      });
    });
  });

  describe('removeEnumType', () => {
    it('should replace $enumType with the value', () => {
      expect(
        removeEnumType({
          val: 'test',
          key: { $enumType: 'Action', value: 'addEntry' },
        })
      ).toEqual({
        val: 'test',
        key: 'addEntry',
      });
    });

    it('should replace $enumType in nested objects', () => {
      expect(
        removeEnumType({
          val: 'test',
          key: {
            first: 'basic',
            second: { $enumType: 'Action', value: 'addEntry' },
          },
        })
      ).toEqual({
        val: 'test',
        key: { first: 'basic', second: 'addEntry' },
      });
    });

    it('should replace $enumType in arrays', () => {
      expect(
        removeEnumType({
          val: 'test',
          arr: [{ $enumType: 'Action', value: 'addEntry' }, '$enumType'],
        })
      ).toEqual({
        val: 'test',
        arr: ['addEntry', '$enumType'],
      });
    });
  });

  describe('checkIfLanguageExists', () => {
    it('returns `true` if the language is present in the config', () => {
      expect(checkIfLanguageExists('javascript')).toBe(true);
    });

    it('returns `false` if the language is not present in the config', () => {
      expect(checkIfLanguageExists('algo')).toBe(false);
    });
  });
});
