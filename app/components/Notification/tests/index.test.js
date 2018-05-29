import React from 'react';
import { shallow } from 'enzyme';
import { Notification } from '../index';

describe('<Notification />', () => {
  it('Render without error.', () => {
    expect(shallow(<Notification />)).toBeDefined();
  });
});
