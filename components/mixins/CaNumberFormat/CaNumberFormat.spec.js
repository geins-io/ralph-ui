import { shallowMount } from '@vue/test-utils';
import CaNumberFormat from './CaNumberFormat.vue';

describe('CaNumberFormat.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNumberFormat);
    expect(component.contains('.ca-number-format')).toBe(true);
  });
});
