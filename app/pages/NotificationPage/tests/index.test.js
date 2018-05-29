import React from 'react';
import { shallow } from 'enzyme';
import { NotificationPage } from '../index';

describe('<NotificationPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<NotificationPage />).exists(<div className="body-container"></div>)).toBe(true);
  });
});
