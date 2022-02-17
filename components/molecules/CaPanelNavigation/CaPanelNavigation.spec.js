import { shallowMount } from '@vue/test-utils';
import CaPanelNavigation from './CaPanelNavigation.vue';

describe('CaPanelNavigation.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaPanelNavigation);
    expect(component.contains('.ca-panel-navigation')).toBe(true);
  });
});
