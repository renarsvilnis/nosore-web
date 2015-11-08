'use strict';

let Person = function (name, surname, gender) {
  this.name = name;
  this.surname = surname;
  this.gender = gender;

  return {
    name,
    surname,
    gender,
    fullname: name + ' ' + surname
  };
};

module.exports = Person;
