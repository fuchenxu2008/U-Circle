import React from 'react';
import { shallow } from 'enzyme';
import { AnswerInput } from '../index';

describe('<AnswerInput />', () => {
  it('Render without error.', () => {
    expect(shallow(<AnswerInput />).exists(<div className="comment-box-inner-wrapper"></div>)).toBe(true);
  });
});
