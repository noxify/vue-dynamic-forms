import DynamicInput from './DynamicInput.vue';
import { FormControl } from '@/core/utils';
import { selectWithProps } from 'tests/helpers';

describe('DynamicInput', () => {
  it('is a Vue instance', () => {
    const Input = selectWithProps(DynamicInput, {
      formControl: new FormControl({
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
      }),
    });
    expect(Input.isVueInstance()).toBeTruthy();
  });
});
