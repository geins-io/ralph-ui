import { shallowMount } from '@vue/test-utils';
import CaVideo from './CaVideo.vue';

describe('CaVideo.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVideo);
    expect(component.contains('.ca-video')).toBe(true);
  });
});
