import { shallowMount } from '@vue/test-utils';
import CaConditionalRootElement from './CaConditionalRootElement.vue';

describe('CaConditionalRootElement.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaConditionalRootElement);
    expect(component.contains('.ca-conditional-root-element')).toBe(true);
  });
});
