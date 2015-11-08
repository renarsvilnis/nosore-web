'use strict';

let core = require('./shared-core');
let setEntries = core.setEntries;
let next = core.next;
let restart = core.restart;
let vote = core.vote;
let INITIAL_STATE = core.INITIAL_STATE;

module.exports = function reducer (state, action) {
  if (!state) {
    state = INITIAL_STATE;
  }

  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    // case 'NEXT':
    //   return next(state);
    // case 'RESTART':
    //   return restart(state);
    // case 'VOTE':
    //   return state.update('vote', (voteState) => {
    //     vote(voteState, action.entry, action.clientId);
    //   });
  }
  return state;
};
