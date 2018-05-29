import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<NotFoundPage />).exists(<div className="body-container"></div>)).toBe(true);
  });
});
