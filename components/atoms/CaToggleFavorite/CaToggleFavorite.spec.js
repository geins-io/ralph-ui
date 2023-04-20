import { shallowMount } from '@vue/test-utils';
import CaToggleFavorite from './CaToggleFavorite.vue';

describe('CaToggleFavorite.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaToggleFavorite);
    expect(component.contains('.ca-toggle-favorite')).toBe(true);
  });
});
