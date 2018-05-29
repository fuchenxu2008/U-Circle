import React from 'react';
import { shallow } from 'enzyme';
import { MainApp } from '../index';

describe('<MainApp />', () => {
  it('Render without error.', () => {
    expect(shallow(<MainApp />).exists(<div className="page"></div>)).toBe(true);
  });
});
