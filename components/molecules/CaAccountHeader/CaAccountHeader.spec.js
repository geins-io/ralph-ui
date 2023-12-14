import { shallowMount } from '@vue/test-utils';
import CaAccountHeader from './CaAccountHeader.vue';

describe('CaAccountHeader.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccountHeader);
    expect(component.contains('.ca-account-header')).toBe(true);
  });
});
