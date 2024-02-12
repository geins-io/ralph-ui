import { shallowMount } from '@vue/test-utils';
import CaCheckoutCarismar from './CaCheckoutCarismar.vue';

describe('CaCheckoutCarismar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutCarismar);
    expect(component.contains('.ca-checkout-carismar')).toBe(true);
  });
});
