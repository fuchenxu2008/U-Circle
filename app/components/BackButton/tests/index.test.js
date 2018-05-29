import React from 'react';
import { shallow } from 'enzyme';
import { BackButton } from '../index';

describe('<BackButton />', () => {
  it('Render without error.', () => {
    expect(shallow(<BackButton />)).toBeDefined();
  });
});
