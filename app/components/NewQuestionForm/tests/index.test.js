import React from 'react';
import { shallow } from 'enzyme';
import { QuestionForm } from '../index';

describe('<NewQuestionForm />', () => {
  it('Render without error.', () => {
    expect(shallow(<QuestionForm />).exists(<div></div>)).toBe(true);
  });
});
