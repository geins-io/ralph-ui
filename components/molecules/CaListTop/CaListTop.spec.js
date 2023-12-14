import { shallowMount } from '@vue/test-utils';
import CaListTop from './CaListTop.vue';

describe('CaListTop.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListTop);
    expect(component.contains('.ca-list-top')).toBe(true);
  });
});
