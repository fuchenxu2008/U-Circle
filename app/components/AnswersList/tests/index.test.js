import React from 'react';
import { shallow } from 'enzyme';
import { AnswersList } from '../index';

describe('<AnswersList />', () => {
  it('Render without error.', () => {
    expect(shallow(<AnswersList />).exists(<div></div>)).toBe(true);
  });
});
