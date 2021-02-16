import { shallowMount } from '@vue/test-utils';
import CaGlobalMessage from './CaGlobalMessage.vue';

describe('CaGlobalMessage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaGlobalMessage);
    expect(component.contains('.ca-global-message')).toBe(true);
  });
});
