import { shallowMount } from '@vue/test-utils';
import CaFooterNavigation from './CaFooterNavigation.vue';

describe('CaFooterNavigation.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFooterNavigation);
    expect(component.contains('.ca-footer-navigation')).toBe(true);
  });
});
