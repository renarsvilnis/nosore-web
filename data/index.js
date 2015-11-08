'use strict';

let divisions = require('./divisions.js');
let rooms = require('./rooms.js');
let util = require('../lib/util');
let RandomPatient = require('./random-patient');
let uuid = require('uuid');

const minRoomCountPerDivision = 3;
const maxRoomCountPerDivision = 7;
const minPersonsPerRoom = 1;
const maxPersonsPerRoom = 10;

let createDivision = function (parentData, division) {
  // Randomize the room count for each division
  let roomCount = util.getRandomInt(
    minRoomCountPerDivision,
    maxRoomCountPerDivision
  );

  let slug = util.createSlug(division.title, parentData.slug);

  let divisionData = {
    id: uuid.v1(),
    title: division.title,
    code: division.code,
    slug,
    list: [],
    navigation_item: true
  };

  for (let i = 0; i < roomCount; i++) {
    divisionData.list.push(createRoom({
      division: division.code,
      slug
    }, rooms[i]));
  }

  return divisionData;
};

let createRoom = function (parentData, room) {
  // Randomize the room count for each division
  let personCount = util.getRandomInt(
    minPersonsPerRoom,
    maxPersonsPerRoom
  );

  let slug = util.createSlug(room, parentData.slug);

  let roomData = {
    id: uuid.v1(),
    title: room,
    code: room,
    slug,
    list: [],
    navigation_item: true
  };

  for (let i = 0; i < personCount; i++) {
    let pacient = new RandomPatient({room, slug, division: parentData.division});

    roomData.list.push(pacient);
  }

  return roomData;
};

let createPatients = function (parentData) {
  let title = 'Patients';
  let slug = util.createSlug(title, parentData.slug);
  return {
    id: uuid.v1(),
    title,
    slug,
    list: divisions.map(createDivision.bind(this, {slug})),
    navigation_item: true
  };
};

module.exports = {
  patients: createPatients('api')
};
