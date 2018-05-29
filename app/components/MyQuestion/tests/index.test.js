import React from 'react';
import { shallow } from 'enzyme';
import { MyQuestion } from '../index';

describe('<MyQuestion />', () => {
  it('Render without error.', () => {
    expect(shallow(<MyQuestion />)).toBeDefined();
  });
});
