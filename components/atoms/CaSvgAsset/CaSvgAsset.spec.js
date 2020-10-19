import { shallowMount } from '@vue/test-utils';
import CaSvgAsset from './CaSvgAsset.vue';

describe('CaSvgAsset.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSvgAsset);
    expect(component.contains('.ca-svg-asset')).toBe(true);
  });
});
