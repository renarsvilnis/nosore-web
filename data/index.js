'use strict';

let Immutable = require('immutable');

let divisions = require('./divisions.js');
let rooms = require('./rooms.js');
let util = require('../lib/util');
let RandomPacient = require('./random-pacient');

const minRoomCountPerDivision = 3;
const maxRoomCountPerDivision = 7;
const minPersonsPerRoom = 1;
const maxPersonsPerRoom = 10;

let createDivision = function (divisionName) {
  // Randomize the room count for each division
  let roomCountForDivision = util.getRandomInt(
    minRoomCountPerDivision,
    maxRoomCountPerDivision
  );

  let slug = util.createSlug(divisionName, 'api');

  let divisionData = {
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

module.exports = Immutable.fromJS({
  pacients: divisions.map(createDivision)
});
