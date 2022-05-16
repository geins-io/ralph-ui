import { shallowMount } from '@vue/test-utils';
import CaTabPanel from './CaTabPanel.vue';

describe('CaTabPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaTabPanel);
    expect(component.contains('.ca-tab-panel')).toBe(true);
  });
});
