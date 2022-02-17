import { shallowMount } from '@vue/test-utils';
import CaTopBarNavigation from './CaTopBarNavigation.vue';

describe('CaTopBarNavigation.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaTopBarNavigation);
    expect(component.contains('.ca-top-bar-navigation')).toBe(true);
  });
});
