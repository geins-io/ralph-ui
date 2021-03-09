import { shallowMount } from '@vue/test-utils';
import CaWidgetVideo from './CaWidgetVideo.vue';

describe('CaWidgetVideo.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetVideo);
    expect(component.contains('.ca-widget-video')).toBe(true);
  });
});
