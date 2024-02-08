import { shallowMount } from '@vue/test-utils';
import CaCheckoutInvoice from './CaCheckoutInvoice.vue';

describe('CaCheckoutInvoice.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutInvoice);
    expect(component.contains('.ca-checkout-invoice')).toBe(true);
  });
});
