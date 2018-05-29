import React from 'react';
import { shallow } from 'enzyme';
import { Answer } from '../index';

describe('<Answer />', () => {
  it('Render without error.', () => {
    expect(shallow(<Answer />).exists(<li className="answer-wrapper"></li>)).toBe(true);
  });
});
