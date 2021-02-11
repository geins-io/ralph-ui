import { shallowMount } from '@vue/test-utils';
import CaAddress from './CaAddress.vue';

describe('CaAddress.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAddress);
    expect(component.contains('.ca-address')).toBe(true);
  });
});
