import { shallowMount } from '@vue/test-utils';
import CaInputCheckbox from './CaInputCheckbox.vue';

describe('CaInputCheckbox.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInputCheckbox);
    expect(component.contains('.ca-input-checkbox')).toBe(true);
  });
});
