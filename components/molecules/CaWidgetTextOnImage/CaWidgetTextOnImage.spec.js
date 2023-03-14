import { shallowMount } from '@vue/test-utils';
import CaWidgetTextOnImage from './CaWidgetTextOnImage.vue';

describe('CaWidgetTextOnImage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetTextOnImage);
    expect(component.contains('.ca-widget-text-on-image')).toBe(true);
  });
});
