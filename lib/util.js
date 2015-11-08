'use strict';

let slug = require('slug');

module.exports = {
  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  createSlug (str, parentSlug) {
    let slugPart = slug(str, {lower: true});
    return parentSlug ? parentSlug + '/' + slugPart : slugPart;
  }
};
