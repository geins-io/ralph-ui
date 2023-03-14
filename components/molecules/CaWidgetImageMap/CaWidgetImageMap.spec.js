import { shallowMount } from '@vue/test-utils';
import CaWidgetImageMap from './CaWidgetImageMap.vue';

describe('CaWidgetImageMap.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetImageMap);
    expect(component.contains('.ca-widget-image-map')).toBe(true);
  });
});
