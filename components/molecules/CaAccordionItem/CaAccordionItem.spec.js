import { shallowMount } from '@vue/test-utils';
import CaAccordionItem from './CaAccordionItem.vue';

describe('CaAccordionItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccordionItem);
    expect(component.contains('.ca-accordion-item')).toBe(true);
  });
});
