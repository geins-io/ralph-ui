import { shallowMount } from '@vue/test-utils';
import CaInputRadio from './CaInputRadio.vue';

describe('CaInputRadio.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInputRadio);
    expect(component.contains('.ca-input-radio')).toBe(true);
  });
});
