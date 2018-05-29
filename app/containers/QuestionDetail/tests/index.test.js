import React from 'react';
import { shallow } from 'enzyme';
import { QuestionDetail } from '../index';

describe('<QuestionDetail />', () => {
  it('Render without error.', () => {
    expect(shallow(<QuestionDetail />).exists(<div className="question-detailed"></div>)).toBe(true);
  });
});
