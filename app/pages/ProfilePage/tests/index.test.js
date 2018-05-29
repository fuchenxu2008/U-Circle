import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage } from '../index';

describe('<ProfilePage />', () => {
  it('Render without error.', () => {
    expect(shallow(<ProfilePage />).exists(<div></div>)).toBe(true);
  });
});
