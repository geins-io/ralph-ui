import { shallowMount } from '@vue/test-utils';
import CaInputSelect from './CaInputSelect.vue';

describe('CaInputSelect.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInputSelect);
    expect(component.contains('.ca-input-select')).toBe(true);
  });
});
