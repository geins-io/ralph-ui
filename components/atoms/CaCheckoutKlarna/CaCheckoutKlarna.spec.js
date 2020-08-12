import { shallowMount } from '@vue/test-utils';
import CaCheckoutKlarna from './CaCheckoutKlarna.vue';

describe('CaCheckoutKlarna.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutKlarna);
    expect(component.contains('.ca-checkout-klarna')).toBe(true);
  });
});
