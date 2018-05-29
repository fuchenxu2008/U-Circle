import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultCard } from '../index';

describe('<SearchResultCard />', () => {
  it('Render without error.', () => {
    expect(shallow(<SearchResultCard />)).toBeDefined();
  });
});
