import { shallowMount } from '@vue/test-utils';
import CaNostoSection from './CaNostoSection.vue';

describe('CaNostoSection.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNostoSection);
    expect(component.contains('.ca-nosto-section')).toBe(true);
  });
});
