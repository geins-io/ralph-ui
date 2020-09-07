import { shallowMount } from '@vue/test-utils';
import CaSecondaryNavItem from './CaSecondaryNavItem.vue';

describe('CaSecondaryNavItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSecondaryNavItem);
    expect(component.contains('.ca-secondary-nav-item')).toBe(true);
  });
});
