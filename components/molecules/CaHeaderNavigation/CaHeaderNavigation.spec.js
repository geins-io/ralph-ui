import { shallowMount } from '@vue/test-utils';
import CaHeaderNavigation from './CaHeaderNavigation.vue';

describe('CaHeaderNavigation.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaHeaderNavigation);
    expect(component.contains('.ca-header-navigation')).toBe(true);
  });
});
