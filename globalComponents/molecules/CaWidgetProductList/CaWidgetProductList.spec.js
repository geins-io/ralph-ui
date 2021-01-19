import { shallowMount } from '@vue/test-utils';
import CaWidgetProductList from './CaWidgetProductList.vue';

describe('CaWidgetProductList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetProductList);
    expect(component.contains('.ca-widget-product-list')).toBe(true);
  });
});
