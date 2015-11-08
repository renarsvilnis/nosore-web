'use strict';

module.exports = function (GeneratorClass, count) {
  if (!count || count === 1) {
    count = 1;
  }

  let res = [];

  for (let i = 0; i < count; i++) {
    res.push(new GeneratorClass());
  }

  return res;
};
