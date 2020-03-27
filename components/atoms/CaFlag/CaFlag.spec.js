import { shallowMount } from '@vue/test-utils';
import CaFlag from './CaFlag.vue';

describe('CaFlag.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFlag);
    expect(component.contains('.ca-flag')).toBe(true);
  });
});
