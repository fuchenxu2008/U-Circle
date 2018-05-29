import React from 'react';
import { shallow } from 'enzyme';
import { LoginHint } from '../index';

describe('<LoginHint />', () => {
  it('Render without error.', () => {
    expect(shallow(<LoginHint />)).toBeDefined();
  });
});
