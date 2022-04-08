import { shallowMount } from '@vue/test-utils';
import CaShippingOptions from './CaShippingOptions.vue';

describe('CaShippingOptions.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaShippingOptions);
    expect(component.contains('.ca-shipping-options')).toBe(true);
  });
});
