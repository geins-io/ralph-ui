import { shallowMount } from '@vue/test-utils';
import CaCheckoutSection from './CaCheckoutSection.vue';

describe('CaCheckoutSection.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCheckoutSection);
    expect(component.contains('.ca-checkout-section')).toBe(true);
  });
});
