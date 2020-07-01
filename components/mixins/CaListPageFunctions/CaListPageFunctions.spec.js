import { shallowMount } from '@vue/test-utils';
import CaListPageFunctions from './CaListPageFunctions.vue';

describe('CaListPageFunctions.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListPageFunctions);
    expect(component.contains('.ca-list-page-functions')).toBe(true);
  });
});
