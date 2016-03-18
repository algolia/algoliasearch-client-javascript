export default function partial(methods, ...params) {
  return Object
    .keys(methods)
    .reduce((boundMethods, methodName) =>
      Object.assign(
        boundMethods,
        {[methodName]: (...args) =>
          methods[methodName](...params, ...args)}
      ), {}
    );
}
