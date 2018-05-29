import React from 'react';
import { shallow } from 'enzyme';
import { MyAnswer } from '../index';

describe('<MyAnswer />', () => {
  it('Render without error.', () => {
    expect(shallow(<MyAnswer />)).toBeDefined();
  });
});
