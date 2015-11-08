'use strict';

let ErrorHandler = function (app) {
  this.app = app;
};

ErrorHandler.prototype.pageNotFoundMiddleware = function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  // TODO: render page if in production
  next(err);
};

ErrorHandler.prototype.displayErrorPage = function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: this.app.get('env') === 'development' ? err : {}
  });
};

module.exports = ErrorHandler;
