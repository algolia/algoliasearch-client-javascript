import * as clientMethods from './clientMethods.js';
import * as indexMethods from './indexMethods.js';

export default function client() {
  const req = () => {console.log('ahah')};

  return {
    initIndex(indexName) {
      return partial(indexMethods, req, indexName);
    },
    ...partial(clientMethods, req)
  };
}

function partial(methods, ...params) {
  return Object
    .keys(methods)
    .reduce((boundMethods, methodName) =>
      Object.assign(
        boundMethods,
        {[methodName]: (...args) =>
          methods[methodName](req, ...args)}
      ), {}
    );
}
