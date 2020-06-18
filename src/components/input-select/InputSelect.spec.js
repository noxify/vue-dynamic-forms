import { selectWithProps } from 'tests/helpers';

import { FormControl } from '@/core/utils/form-control.model.js';

import InputSelect from './InputSelect.vue';

describe('InputSelect', () => {
  let Select;

  beforeEach(() => {
    Select = selectWithProps(InputSelect, {
      formControl: new FormControl({
        type: 'select',
        label: 'Category',
        name: 'category',
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'arduino', text: 'Arduino' },
          { value: 'transistors', text: 'Transistors' },
          { value: 'resistors', text: 'Resistors', disabled: true },
        ],
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(Select.isVueInstance()).toBeTruthy();
  });

  it('it renders a select input"', () => {
    expect(Select.find('select')).toBeTruthy();
  });

  it('it renders the options', () => {
    expect(Select.findAll('option').length).toBeGreaterThan(0);
  });
  it('adds disabled to option with  disabled:true"', () => {
    const disabled = Select.find('option[disabled="true"]');
    expect(disabled).toBeTruthy();
  });

  it('it calls valueChanged when input value is changed', () => {
    const valueChange = jest.spyOn(Select.vm, 'valueChange');
    const options = Select.find('select').findAll('option');
    options.at(1).setSelected();
    Select.find('.form-control').trigger('change');
    expect(valueChange).toBeCalled();
  });

  it('it emits change event with the value changed', () => {
    const select = Select.find('.form-control');
    const options = Select.find('select').findAll('option');
    options.at(1).setSelected();
    select.trigger('change');
    expect(Select.emitted().change).toBeTruthy();
    expect(Select.emitted().change[0]).toEqual(['arduino']);
  });

  it('it calls onFocus when input is focused', () => {
    const onFocus = jest.spyOn(Select.vm, 'onFocus');
    Select.find('.form-control').trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it('it emits focus event when the input is focused', () => {
    Select.find('.form-control').trigger('focus');
    expect(Select.emitted().focus).toBeTruthy();
  });

  it('it calls onBlur when input is bblurred', () => {
    const onBlur = jest.spyOn(Select.vm, 'onBlur');
    Select.find('.form-control').trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it('it emits blur event when the input is blurred', () => {
    Select.find('.form-control').trigger('blur');
    expect(Select.emitted().blur).toBeTruthy();
  });

  it('it set formControl touched to true when blurred', () => {
    expect(Select.vm.formControl.touched).toBeFalsy();
    Select.find('.form-control').trigger('blur');
    expect(Select.vm.formControl.touched).toBeTruthy();
  });
});
