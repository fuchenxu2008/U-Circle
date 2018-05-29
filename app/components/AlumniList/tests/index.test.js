import React from 'react';
import { shallow } from 'enzyme';
import { AlumniList } from '../index';

describe('<AlumniList />', () => {
  it('Render without error.', () => {
    expect(shallow(<AlumniList />).exists(<div></div>)).toBe(true);
  });
});
