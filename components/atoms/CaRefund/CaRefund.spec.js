import { shallowMount } from '@vue/test-utils';
import CaRefund from './CaRefund.vue';

describe('CaRefund.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaRefund);
    expect(component.contains('.ca-refund')).toBe(true);
  });
});
