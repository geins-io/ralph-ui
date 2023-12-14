import { shallowMount } from '@vue/test-utils';
import CaListSettings from './CaListSettings.vue';

describe('CaListSettings.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListSettings);
    expect(component.contains('.ca-list-settings')).toBe(true);
  });
});
