import { shallowMount } from '@vue/test-utils';
import CaFooterNavigationAccordion from './CaFooterNavigationAccordion.vue';

describe('CaFooterNavigationAccordion.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFooterNavigationAccordion);
    expect(component.contains('.ca-footer-navigation-accordion')).toBe(true);
  });
});
