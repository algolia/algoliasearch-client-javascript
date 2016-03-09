/* eslint-env mocha */
import expect from 'expect';
import sinon from 'sinon';
import client from './client.js';

describe('client()', () => {
  it('can be called', () => {
    client();
  });
});
