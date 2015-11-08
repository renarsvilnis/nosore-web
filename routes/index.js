'use strict';

let ContentHandler = require('./content-handler.js');
let ErrorHandler = require('./error-handler.js');
let ApiHandler = require('./api-handler.js');

module.exports = function (app, db) {
  let contentHandler = new ContentHandler(db);
  let errorHandler = new ErrorHandler(app);
  let apiHandler = new ApiHandler();

  // The main page of the blog
  app.get('/', contentHandler.displayHomePage);

  app.get('/api/pacients', apiHandler.handleGetPacients);
  // app.get('/api/pacient/:id', apiHandler.handleGetPacient);
  // app.get('/api/nurses', apiHandler.handleGetNurses);
  // app.get('/api/nurse/:id', apiHandler.handleGetNurse);

  // Middleware to see if a user is logged in
  // app.use(sessionHandler.isLoggedInMiddleware);

  // // The main page of the blog, filtered by tag
  // app.get('/tag/:tag', contentHandler.displayMainPageByTag);

  // // A single post, which can be commented on
  // app.get("/post/:permalink", contentHandler.displayPostByPermalink);
  // app.post('/newcomment', contentHandler.handleNewComment);
  // app.get("/post_not_found", contentHandler.displayPostNotFound);

  // // Displays the form allowing a user to add a new post. Only works for logged in users
  // app.get('/newpost', contentHandler.displayNewPostPage);
  // app.post('/newpost', contentHandler.handleNewPost);

  // // Login form
  // app.get('/login', sessionHandler.displayLoginPage);
  // app.post('/login', sessionHandler.handleLoginRequest);

  // // Logout page
  // app.get('/logout', sessionHandler.displayLogoutPage);

  // // Welcome page
  // app.get("/welcome", sessionHandler.displayWelcomePage);

  // // Signup form
  // app.get('/signup', sessionHandler.displaySignupPage);
  // app.post('/signup', sessionHandler.handleSignup);

  app.get('*', contentHandler.displayHomePage);

  // // Error handling middleware
  app.use(errorHandler.pageNotFoundMiddleware);
  app.use(errorHandler.displayErrorPage.bind(errorHandler));
}
