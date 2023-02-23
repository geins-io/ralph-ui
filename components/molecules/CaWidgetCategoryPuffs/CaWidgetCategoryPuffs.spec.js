import { shallowMount } from '@vue/test-utils';
import CaWidgetCategoryPuffs from './CaWidgetCategoryPuffs.vue';

describe('CaWidgetCategoryPuffs.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetCategoryPuffs);
    expect(component.contains('.ca-widget-category-puffs')).toBe(true);
  });
});
