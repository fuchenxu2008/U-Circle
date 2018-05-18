import React from 'react';
import { shallow } from 'enzyme';

import UserHeading from '../index';

describe('<UserHeading />', () => {
  it('Expect to be rendered', () => {
    expect(shallow(<UserHeading />)).toBeDefined();
  });
});
