import { shallowMount } from '@vue/test-utils';
import CaLoginPanel from './CaLoginPanel.vue';

describe('CaLoginPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaLoginPanel);
    expect(component.contains('.ca-login-panel')).toBe(true);
  });
});
