'use strict';

let fakeData = require('../data');

let ApiHandler = function () {};

ApiHandler.prototype.handleGetPacients = function (req, res, next) {
  res.json(fakeData);
};

module.exports = ApiHandler;
