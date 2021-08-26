import { shallowMount } from '@vue/test-utils';
import CaListCountBar from './CaListCountBar.vue';

describe('CaListCountBar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListCountBar);
    expect(component.contains('.ca-list-count-bar')).toBe(true);
  });
});
