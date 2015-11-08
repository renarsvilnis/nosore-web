'use strict';

let divisions = require('./divisions.js');
let rooms = require('./rooms.js');
let util = require('../lib/util');
let RandomPacient = require('./random-pacient');
let uuid = require('uuid');

const minRoomCountPerDivision = 3;
const maxRoomCountPerDivision = 7;
const minPersonsPerRoom = 1;
const maxPersonsPerRoom = 10;

let createDivision = function (parentSlug, divisionName) {
  // Randomize the room count for each division
  let roomCountForDivision = util.getRandomInt(
    minRoomCountPerDivision,
    maxRoomCountPerDivision
  );

  let slug = util.createSlug(divisionName, parentSlug);

  let divisionData = {
    id: uuid.v1(),
    title: divisionName,
    slug,
    list: []
  };

  for (let i = 0; i < roomCountForDivision; i++) {
    divisionData.list.push(createRoom(rooms[i], slug));
  }

  return divisionData;
};

let createRoom = function (roomName, parentSlug) {
  // Randomize the room count for each division
  let personsForRoom = util.getRandomInt(
    minPersonsPerRoom,
    maxPersonsPerRoom
  );

  let slug = util.createSlug(roomName, parentSlug);

  let roomData = {
    id: uuid.v1(),
    title: roomName,
    slug,
    list: []
  };

  for (let i = 0; i < personsForRoom; i++) {
    let pacient = new RandomPacient(slug);

    roomData.list.push(pacient);
  }

  return roomData;
};

let createPacients = function (parentSlug) {
  let title = 'pacients';
  let slug = util.createSlug(title, parentSlug);
  return {
    id: uuid.v1(),
    title,
    slug,
    list: divisions.map(createDivision.bind(this, parentSlug))
  };
};

module.exports = {
  pacients: createPacients('api')
};
