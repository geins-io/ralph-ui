import { shallowMount } from '@vue/test-utils';
import CaCheckoutExternal from './CaCheckoutExternal.vue';

describe('CaCheckoutExternal.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutExternal);
    expect(component.contains('.ca-checkout-external')).toBe(true);
  });
});
