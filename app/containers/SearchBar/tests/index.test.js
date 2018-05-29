import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from '../index';

describe('<SearchBar />', () => {
  it('Render without error.', () => {
    expect(shallow(<SearchBar />)).toBeDefined();
  });
});
