import { shallowMount } from '@vue/test-utils';
import CaOrderSummary from './CaOrderSummary.vue';

describe('CaOrderSummary.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaOrderSummary);
    expect(component.contains('.ca-order-summary')).toBe(true);
  });
});
