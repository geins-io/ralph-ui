import { shallowMount } from '@vue/test-utils';
import CaPaymentOptions from './CaPaymentOptions.vue';

describe('CaPaymentOptions.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaPaymentOptions);
    expect(component.contains('.ca-payment-options')).toBe(true);
  });
});
