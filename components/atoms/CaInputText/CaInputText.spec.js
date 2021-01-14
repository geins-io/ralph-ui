import { shallowMount } from '@vue/test-utils';
import CaInputText from './CaInputText.vue';

describe('CaInputText.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInputText);
    expect(component.contains('.ca-input-text')).toBe(true);
  });
});
