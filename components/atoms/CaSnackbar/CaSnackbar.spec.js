import { shallowMount } from '@vue/test-utils';
import CaSnackbar from './CaSnackbar.vue';

describe('CaSnackbar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSnackbar);
    expect(component.contains('.ca-snackbar')).toBe(true);
  });
});
