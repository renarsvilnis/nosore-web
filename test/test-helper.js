/* global describe, it */
'use strict';

import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

describe('immutability', () => {
  describe('a number', () => {
    function increment (currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });
});
