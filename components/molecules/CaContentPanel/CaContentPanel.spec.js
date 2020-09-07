import { shallowMount } from '@vue/test-utils';
import CaContentPanel from './CaContentPanel.vue';

describe('CaContentPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaContentPanel);
    expect(component.contains('.ca-content-panel')).toBe(true);
  });
});
