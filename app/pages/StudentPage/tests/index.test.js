import React from 'react';
import { shallow } from 'enzyme';
import { StudentPage } from '../index';

describe('<StudentPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<StudentPage />).exists(<div className="body-container"></div>)).toBe(true);
  });
});
