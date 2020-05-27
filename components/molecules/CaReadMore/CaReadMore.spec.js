import { shallowMount } from '@vue/test-utils';
import CaReadMore from './CaReadMore.vue';

describe('CaReadMore.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaReadMore);
    expect(component.contains('.ca-read-more')).toBe(true);
  });
});
