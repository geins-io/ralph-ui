import { shallowMount } from '@vue/test-utils';
import CaNavigationSlim from './CaNavigationSlim.vue';

describe('CaNavigationSlim.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNavigationSlim);
    expect(component.contains('.ca-navigation-slim')).toBe(true);
  });
});
