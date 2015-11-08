'use strict';

let Person = require('./Person');
let getRandomInt = require('../../../lib/util').getRandomInt;

let males = require('../data/male.js');
let females = require('../data/female.js');
let surnames = require('../data/surname.js');

module.exports = function () {
  let name;
  let gender;

  if (getRandomInt(0, 2) === 0) {
    name = males[getRandomInt(0, males.length)];
    gender = 'm';
  } else {
    name = females[getRandomInt(0, females.length)];
    gender = 'f';
  }

  let surname = surnames[getRandomInt(0, surnames.length)];

  return new Person(name, surname, gender);
};
