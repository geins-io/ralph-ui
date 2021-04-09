import { shallowMount } from '@vue/test-utils';
import CaHtml from './CaHtml.vue';

describe('CaHtml.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaHtml);
    expect(component.contains('.ca-html')).toBe(true);
  });
});
