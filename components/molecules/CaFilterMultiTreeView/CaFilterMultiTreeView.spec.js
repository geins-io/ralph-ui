import { shallowMount } from '@vue/test-utils';
import CaFilterMultiTreeView from './CaFilterMultiTreeView.vue';

describe('CaFilterMultiTreeView.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterMultiTreeView);
    expect(component.contains('.ca-filter-multi-tree-view')).toBe(true);
  });
});
