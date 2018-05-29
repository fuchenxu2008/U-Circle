import React from 'react';
import { shallow } from 'enzyme';
import { AvatarUploader } from '../index';

describe('<AvatarUploader />', () => {
  it('Render without error.', () => {
    expect(shallow(<AvatarUploader />).exists(<div></div>)).toBe(true);
  });
});
