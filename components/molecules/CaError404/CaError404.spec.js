import { shallowMount } from '@vue/test-utils';
import CaError404 from './CaError404.vue';

describe('CaError404.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaError404);
    expect(component.contains('.ca-error404')).toBe(true);
  });
});
