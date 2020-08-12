import { shallowMount } from '@vue/test-utils';
import CaCheckout from './CaCheckout.vue';

describe('CaCheckout.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckout);
    expect(component.contains('.ca-checkout')).toBe(true);
  });
});
