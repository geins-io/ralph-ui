import { shallowMount } from '@vue/test-utils';
import CaAccordionNavigation from './CaAccordionNavigation.vue';

describe('CaAccordionNavigation.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccordionNavigation);
    expect(component.contains('.ca-accordion-navigation')).toBe(true);
  });
});
