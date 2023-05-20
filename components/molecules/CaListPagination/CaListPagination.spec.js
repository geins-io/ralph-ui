import { shallowMount } from '@vue/test-utils';
import CaListPagination from './CaListPagination.vue';

describe('CaListPagination.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListPagination);
    expect(component.contains('.ca-list-pagination')).toBe(true);
  });
});
