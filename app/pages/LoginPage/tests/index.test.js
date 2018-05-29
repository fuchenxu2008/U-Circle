import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../index';

describe('<LoginPage />', () => {
  it('Render without error.', () => {
    expect(shallow(<LoginPage />).exists(<div className="body-container"></div>)).toBe(true);
  });
});
