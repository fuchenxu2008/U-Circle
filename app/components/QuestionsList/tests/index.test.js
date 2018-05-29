import React from 'react';
import { shallow } from 'enzyme';
import { QuestionsList } from '../index';

describe('<QuestionsList />', () => {
  it('Render without error.', () => {
    expect(shallow(<QuestionsList />).exists(<div></div>)).toBe(true);
  });
});
