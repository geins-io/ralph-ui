import { shallowMount } from '@vue/test-utils';
import CaPrompt from './CaPrompt.vue';

describe('CaPrompt.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaPrompt);
    expect(component.contains('.ca-prompt')).toBe(true);
  });
});
