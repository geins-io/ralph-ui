import { shallowMount } from '@vue/test-utils';
import CaCartSummary from './CaCartSummary.vue';

describe('CaCartSummary.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCartSummary);
    expect(component.contains('.ca-cart-summary')).toBe(true);
  });
});
