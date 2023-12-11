import { shallowMount } from '@vue/test-utils';
import CaProductAccordion from './CaProductAccordion.vue';

describe('CaProductAccordion.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductAccordion);
    expect(component.contains('.ca-product-accordion')).toBe(true);
  });
});
