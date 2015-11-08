'use strict';

let createStore = require('redux').createStore;
let reducer = require('./reducer');

module.exports = function makeStore () {
  return createStore(reducer);
};
