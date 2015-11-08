'use strict';

let ContentHandler = function (db) {};

ContentHandler.prototype.displayHomePage = function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
};

module.exports = ContentHandler;
