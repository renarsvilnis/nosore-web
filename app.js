'use strict';

let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let helmet = require('helmet');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let routes = require('./routes/index');
let io = require('./lib/socket-server');
let makeStore = require('./lib/store');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('view cache', app.get('env') === 'production');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app/*, db*/);

// create app store
const store = exports.store = makeStore();
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./data')
});

io.on('connection', function (socket) {
  console.log('Client has connected to the server!');
  socket.emit('state', store.getState().toJS());
});

module.exports = app;
