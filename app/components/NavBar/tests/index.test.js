import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../index';

describe('<NavBar />', () => {
  it('Render without error.', () => {
    expect(shallow(<NavBar />)).toBeDefined();
  });
});
