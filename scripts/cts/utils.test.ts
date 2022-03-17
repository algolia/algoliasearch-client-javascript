import { capitalize, createClientName } from './utils';

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
    it('does not capitalize every part for JavaScript', () => {
      expect(createClientName('search', 'javascript')).toEqual('searchApi');
      expect(createClientName('search-client', 'javascript')).toEqual(
        'searchClientApi'
      );
      expect(createClientName('search-cli!nt-complex', 'javascript')).toEqual(
        'searchCli!ntComplexApi'
      );
    });

    it('capitalize every part for other languages', () => {
      expect(createClientName('search', 'java')).toEqual('SearchApi');
      expect(createClientName('search-client', 'java')).toEqual(
        'SearchClientApi'
      );
      expect(createClientName('search-cli!nt-complex', 'java')).toEqual(
        'SearchCli!ntComplexApi'
      );
    });
  });
});
