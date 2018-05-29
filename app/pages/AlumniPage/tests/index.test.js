import React from 'react';
import { shallow } from 'enzyme';
import { AlumniPage } from '../index';

describe('<AlumniPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<AlumniPage />).exists(<div className="body-container Alumnipage-bg"></div>)).toBe(true);
  });
});
