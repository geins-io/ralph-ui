import { shallowMount } from '@vue/test-utils';
import CaCustomerTypeToggle from './CaCustomerTypeToggle.vue';

describe('CaCustomerTypeToggle.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCustomerTypeToggle);
    expect(component.contains('.ca-customer-type-toggle')).toBe(true);
  });
});
