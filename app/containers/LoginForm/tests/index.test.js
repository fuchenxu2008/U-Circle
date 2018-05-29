import React from 'react';
import { shallow } from 'enzyme';
import { NormalLoginForm } from '../index';

describe('<NormalLoginForm />', () => {
  it('Render without error.', () => {
    expect(shallow(<NormalLoginForm />).exists(<div className="loginFormStyle"></div>)).toBe(true);
  });
});
