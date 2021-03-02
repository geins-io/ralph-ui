import { shallowMount } from '@vue/test-utils';
import CaModal from './CaModal.vue';

describe('CaModal.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaModal);
    expect(component.contains('.ca-modal')).toBe(true);
  });
});
