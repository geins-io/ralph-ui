import { shallowMount } from '@vue/test-utils';
import CaCheckoutHeader from './CaCheckoutHeader.vue';

describe('CaCheckoutHeader.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutHeader);
    expect(component.contains('.ca-checkout-header')).toBe(true);
  });
});
