import React from 'react';
import { shallow } from 'enzyme';
import { UserStuffPage } from '../index';

describe('<UserStuffPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<UserStuffPage />).exists(<div></div>)).toBe(true);
  });
});
