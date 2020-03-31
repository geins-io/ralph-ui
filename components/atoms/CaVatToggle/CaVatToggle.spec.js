import { shallowMount } from '@vue/test-utils';
import CaVatToggle from './CaVatToggle.vue';

describe('CaVatToggle.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVatToggle);
    expect(component.contains('.ca-vat-toggle')).toBe(true);
  });
});
