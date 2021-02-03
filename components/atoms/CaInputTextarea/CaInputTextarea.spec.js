import { shallowMount } from '@vue/test-utils';
import CaInputTextarea from './CaInputTextarea.vue';

describe('CaInputTextarea.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInputTextarea);
    expect(component.contains('.ca-input-textarea')).toBe(true);
  });
});
