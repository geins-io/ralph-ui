import { shallowMount } from '@vue/test-utils';
import CaSecondaryNav from './CaSecondaryNav.vue';

describe('CaSecondaryNav.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSecondaryNav);
    expect(component.contains('.ca-secondary-nav')).toBe(true);
  });
});
