
import { fromJS } from 'immutable';
import questionDetailReducer from '../reducer';

describe('questionDetailReducer', () => {
  it('returns the initial state', () => {
    expect(questionDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
