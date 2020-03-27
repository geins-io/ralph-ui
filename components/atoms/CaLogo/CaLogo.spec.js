import { shallowMount } from '@vue/test-utils';
import CaLogo from './CaLogo.vue';

describe('CaLogo.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaLogo);
    expect(component.contains('.ca-logo')).toBe(true);
  });
});
