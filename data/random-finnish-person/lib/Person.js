'use strict';

let Person = function (name, surname, gender) {
  this.name = name;
  this.surname = surname;
  this.gender = gender;
};

Person.prototype.toString = function () {
  return this.name + ' ' + this.surname;
};

module.exports = Person;
