import { shallowMount } from '@vue/test-utils';
import CaOverlay from './CaOverlay.vue';

describe('CaOverlay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaOverlay);
    expect(component.contains('.ca-overlay')).toBe(true);
  });
});
