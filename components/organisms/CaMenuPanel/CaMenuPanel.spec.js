import { shallowMount } from '@vue/test-utils';
import CaMenuPanel from './CaMenuPanel.vue';

describe('CaMenuPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMenuPanel);
    expect(component.contains('.ca-menu-panel')).toBe(true);
  });
});
