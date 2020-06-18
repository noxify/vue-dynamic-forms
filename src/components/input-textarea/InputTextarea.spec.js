import { selectWithProps } from 'tests/helpers';

import { FormControl } from '@/core/utils';

import InputTextArea from './InputTextArea.vue';

describe('InputTextArea', () => {
  let Textarea;

  beforeEach(() => {
    Textarea = selectWithProps(InputTextArea, {
      formControl: new FormControl({
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
        cols: 30,
        rows: 5,
      }),
    });
  });

  it('is a Vue instance', () => {
    expect(Textarea.isVueInstance()).toBeTruthy();
  });

  it('it renders a textarea', () => {
    expect(Textarea.find('textarea')).toBeTruthy();
  });

  it('it sets textarea cols attribute', () => {
    const textArea = Textarea.find('textarea');
    expect(textArea.attributes('cols')).toBe('30');
  });

  it('it sets textarea rows attribute', () => {
    const textArea = Textarea.find('textarea');
    expect(textArea.attributes('rows')).toBe('5');
  });

  it('it set textarea to disabled"', () => {
    Textarea = selectWithProps(InputTextArea, {
      formControl: new FormControl({
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
        cols: 30,
        rows: 5,
        disabled: true,
      }),
    });
    expect(Textarea.find('textarea[disabled]')).toBeTruthy();
  });

  it('it calls valueChanged when textarea value is changed', () => {
    const valueChange = jest.spyOn(Textarea.vm, 'valueChange');
    Textarea.find('.form-control').trigger('change');
    expect(valueChange).toBeCalled();
  });

  it('it emits change event with the value changed', () => {
    const textarea = Textarea.find('.form-control');
    textarea.setValue('Geralt of Rivia');
    textarea.trigger('change');
    expect(Textarea.emitted().change).toBeTruthy();
    expect(Textarea.emitted().change[0]).toEqual(['Geralt of Rivia']);
  });

  it('it calls onFocus when textarea is focused', () => {
    const onFocus = jest.spyOn(Textarea.vm, 'onFocus');
    Textarea.find('.form-control').trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it('it emits focus event when the textarea is focused', () => {
    Textarea.find('.form-control').trigger('focus');
    expect(Textarea.emitted().focus).toBeTruthy();
  });

  it('it calls onBlur when textarea is bblurred', () => {
    const onBlur = jest.spyOn(Textarea.vm, 'onBlur');
    Textarea.find('.form-control').trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it('it emits blur event when the textarea is blurred', () => {
    Textarea.find('.form-control').trigger('blur');
    expect(Textarea.emitted().blur).toBeTruthy();
  });

  it('it set formControl touched to true when blurred', () => {
    expect(Textarea.vm.formControl.touched).toBeFalsy();
    Textarea.find('.form-control').trigger('blur');
    expect(Textarea.vm.formControl.touched).toBeTruthy();
  });
});
