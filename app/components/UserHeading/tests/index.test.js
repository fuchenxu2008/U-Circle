import React from 'react';
import { shallow } from 'enzyme';
import { UserHeading } from '../index';

describe('<UserHeading />', () => {
  it('Render without error.', () => {
    expect(shallow(<UserHeading />).exists(<div className="user-heading"></div>)).toBe(true);
  });
});
