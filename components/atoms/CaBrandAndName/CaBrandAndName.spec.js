import { shallowMount } from '@vue/test-utils';
import CaBrandAndName from './CaBrandAndName.vue';

describe('CaBrandAndName.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaBrandAndName);
    expect(component.contains('.ca-brand-and-name')).toBe(true);
  });
});
