/* eslint-env mocha */
import expect from 'expect';
import sinon from 'sinon';
import * as clientMethods from './clientMethods.js';

describe('clientMethods', () => {
  const req = sinon.spy();
  beforeEach(() => req.reset());

  it('has the right set of methods', () =>
    expect(Object.keys(clientMethods)).toEqual([
      'batch',
      'copyIndex',
      'deleteIndex',
      'listIndexes',
      'moveIndex',
      'search'
    ])
  );

  it('has a deleteIndex method', () => {
    clientMethods.deleteIndex(req, 'delete it');
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'DELETE',
      path: '/1/indexes/%s',
      pathParams: ['delete it']
    });
  });

  it('has a moveIndex method', () => {
    clientMethods.moveIndex(req, 'move it', 'here');
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'POST',
      path: '/1/indexes/%s/operation',
      pathParams: ['move it'],
      params: {destination: 'here', operation: 'move'}
    });
  });

  it('has a copyIndex method', () => {
    clientMethods.copyIndex(req, 'copy it', 'here');
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'POST',
      path: '/1/indexes/%s/operation',
      pathParams: ['copy it'],
      params: {destination: 'here', operation: 'copy'}
    });
  });

  it('has a listIndexes method', () => {
    clientMethods.listIndexes(req, 2);
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'GET',
      path: '/1/indexes',
      params: {page: 2}
    });
  });

  it('has a search method', () => {
    clientMethods.search(req, [{indexName: 'clients', params: {query: 'vi'}}]);
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'POST',
      path: '/1/indexes/*/queries',
      params: {requests: [{indexName: 'clients', params: {query: 'vi'}}]}
    });
  });

  it('has a batch method', () => {
    clientMethods.batch(req, [{indexName: 'clients', params: {query: 'vi'}}]);
    expect(req.calledOnce).toBe(true, 'req() called once');
    expect(req.args[0][0]).toEqual({
      method: 'POST',
      path: '/1/indexes/*/batch',
      params: {requests: [{indexName: 'clients', params: {query: 'vi'}}]}
    });
  });
});
