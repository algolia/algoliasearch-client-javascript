import { getVersionsToRelease, getLangsToUpdateRepo } from '../process-release';

describe('process release', () => {
  it('gets versions to release', () => {
    const versions = getVersionsToRelease(`
    ## Version Changes
    
    - [x] javascript: v1.0.0 -> v1.1.0
    - [x] php: v2.0.0 -> v2.0.1
    - [ ] java: v3.0.0 -> v3.0.1
    `);

    expect(Object.keys(versions)).toEqual(['javascript', 'php']);
    expect(versions.javascript.current).toEqual('1.0.0');
    expect(versions.javascript.next).toEqual('1.1.0');
    expect(versions.php.current).toEqual('2.0.0');
    expect(versions.php.next).toEqual('2.0.1');
  });

  it('gets langs to update', () => {
    expect(
      getLangsToUpdateRepo(`
## Version Changes

- [ ] javascript: v1.0.0 -> v1.1.0
- [x] php: v2.0.0 -> v2.0.1
- [ ] java: v3.0.0 -> v3.0.1
`)
    ).toEqual(['javascript', 'java']);
  });
});
