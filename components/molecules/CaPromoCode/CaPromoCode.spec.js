import { shallowMount } from '@vue/test-utils';
import CaPromoCode from './CaPromoCode.vue';

describe('CaPromoCode.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaPromoCode);
    expect(component.contains('.ca-promo-code')).toBe(true);
  });
});
