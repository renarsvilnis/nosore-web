'use strict';

let uuid = require('uuid');
let moment = require('moment');
let util = require('../../lib/util');

let RandomFinnishPerson = require('../random-finnish-person');

const MinRepositioningInterval = 15; // minutes
const MaxRepositioningInterval = 120; // minutes
const MinCheckupInterval = 1; // days
const MaxCheckupInterval = 7; // days

let generateRandomVisitInterval = function () {
  return util.getRandomInt(
    MinRepositioningInterval,
    MaxRepositioningInterval
  );
};

let generateRandomCheckupInterval = function () {
  return util.getRandomInt(
    MinCheckupInterval,
    MaxCheckupInterval
  );
};

class RandomPacient extends RandomFinnishPerson {
  constructor (parentSlug) {
    super();

    this.id = uuid.v1();
    this.slug = util.createSlug(this.toString(), parentSlug);
    this.last_visit = moment().subtract(generateRandomVisitInterval(), 'm');
    this.next_visit = moment().add(generateRandomVisitInterval(), 'm');
    this.next_checkup = moment().add(generateRandomCheckupInterval(), 'd');
  }
}

module.exports = RandomPacient;

