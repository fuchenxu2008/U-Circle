import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'antd';
import { Question } from '../index';

describe('<Question />', () => {
  it('Render without error.', () => {
    expect(shallow(<Question />).exists(<Row className="question"></Row>)).toBe(true);
  });
});
