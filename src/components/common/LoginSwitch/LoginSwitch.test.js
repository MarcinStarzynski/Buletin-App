import React from 'react';
import { shallow } from 'enzyme';
import { LoginSwitch } from './LoginSwitch';

describe('Component LoginSwitch', () => {
  it('should render without crashing', () => {
    const component = shallow(<LoginSwitch />);
    expect(component).toBeTruthy();
  });
});
