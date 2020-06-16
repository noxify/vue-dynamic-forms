import { selectWithProps } from 'tests/helpers';

import { FormControl } from '@/core/utils';

import InputText from './InputText.vue';

describe('InputText', () => {
  let Input;

  beforeEach(() => {
    Input = selectWithProps(InputText, {
      formControl: new FormControl({
        type: 'text',
        label: 'Name',
        name: 'name',
      }),
    });
  });

  it('is a Vue instance', () => {
    expect(Input.isVueInstance()).toBeTruthy();
  });

  it('it renders a input of type="text"', () => {
    expect(Input.find('input[type="text"]')).toBeTruthy();
  });

  it('it set input to disabled"', () => {
    Input = selectWithProps(InputText, {
      formControl: new FormControl({
        type: 'text',
        label: 'Name',
        name: 'name',
        disabled: true,
      }),
    });
    expect(Input.find('input[disabled]')).toBeTruthy();
  });

  it('it calls valueChanged when input value is changed', () => {
    const valueChange = jest.spyOn(Input.vm, 'valueChange');
    Input.find('.form-control').trigger('change');
    expect(valueChange).toBeCalled();
  });

  it('it emits change event with the value changed', () => {
    const input = Input.find('.form-control');
    input.setValue('Geralt of Rivia');
    input.trigger('change');
    expect(Input.emitted().change).toBeTruthy();
    expect(Input.emitted().change[0]).toEqual(['Geralt of Rivia']);
  });

  it('it calls onFocus when input is focused', () => {
    const onFocus = jest.spyOn(Input.vm, 'onFocus');
    Input.find('.form-control').trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it('it emits focus event when the input is focused', () => {
    Input.find('.form-control').trigger('focus');
    expect(Input.emitted().focus).toBeTruthy();
  });

  it('it calls onBlur when input is bblurred', () => {
    const onBlur = jest.spyOn(Input.vm, 'onBlur');
    Input.find('.form-control').trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it('it emits blur event when the input is blurred', () => {
    Input.find('.form-control').trigger('blur');
    expect(Input.emitted().blur).toBeTruthy();
  });

  it('it set formControl touched to true when blurred', () => {
    expect(Input.vm.formControl.touched).toBeFalsy();
    Input.find('.form-control').trigger('blur');
    expect(Input.vm.formControl.touched).toBeTruthy();
  });
});
