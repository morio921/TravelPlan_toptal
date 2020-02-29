import React from 'react';
import { mount } from 'enzyme';
import Signup from '../Signup';

describe('<Signup />', () => {
  it('Contains 5 input elements', () => {
    const wrapper = mount(<Signup />);
    expect(wrapper.find('input').length).toEqual(5);
  })

  it('Contains signup button', () => {
    const wrapper = mount(<Signup />);
    expect(wrapper.find('button').length).toEqual(1);
  })
});
