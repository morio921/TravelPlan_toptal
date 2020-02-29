import React from 'react';
import { mount } from 'enzyme';
import Signin from '../Signin';

describe('<Signin />', () => {
  it('Contains email and password input elements', () => {
    const wrapper = mount(<Signin />);
    expect(wrapper.find('input').length).toEqual(2);
  })

  it('Contains Login button', () => {
    const wrapper = mount(<Signin />);
    expect(wrapper.find('button').length).toEqual(1);
  })
});
