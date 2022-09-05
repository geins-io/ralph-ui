import { shallowMount } from '@vue/test-utils';
import CaFilterMultiTreeNode from './CaFilterMultiTreeNode.vue';

describe('CaFilterMultiTreeNode.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterMultiTreeNode);
    expect(component.contains('.ca-filter-multi-tree-node')).toBe(true);
  });
});
