import { shallowMount } from '@vue/test-utils';
import CaCustomerServiceBox from './CaCustomerServiceBox.vue';

describe('CaCustomerServiceBox.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCustomerServiceBox);
    expect(component.contains('.ca-customer-service-box')).toBe(true);
  });
});
