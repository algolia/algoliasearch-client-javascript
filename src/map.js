const foreach = require('foreach');

module.exports = function map(arr, fn) {
  const newArr = [];
  foreach(arr, (item, itemIndex) => {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};
