import { selectWithProps, selectDeepWithProps } from 'tests/helpers';
import DynamicForm from './DynamicForm.vue';
import DynamicInput from '../dynamic-input/DynamicInput.vue';
import InputText from '../input-text/InputText.vue';

import {
  FormControl,
  FormField,
  FormValidation,
  required,
  email,
  min,
} from '@/core/utils';

const DEFAULT_FIELDS = [
  new FormField({
    type: 'email',
    label: 'email',
    name: 'email',
    validations: [
      new FormValidation(required, 'This field is required'),
      new FormValidation(email, 'Format of email is incorrect'),
    ],
  }),
  new FormField({
    type: 'number',
    label: 'number',
    name: 'number',
    validations: [
      new FormValidation(required, 'This field is required'),
      new FormValidation(min(3), 'The minimum of this value is %'),
    ],
  }),
];

describe('DynamicForm', () => {
  let mapControlsFn;
  let handleSubmitFn;

  beforeEach(() => {
    mapControlsFn = jest.spyOn(DynamicForm.methods, 'mapControls');
    handleSubmitFn = jest.spyOn(DynamicForm.methods, 'handleSubmit');
  });

  it('is a Vue instance', () => {
    const Form = selectWithProps(DynamicForm);
    expect(Form.isVueInstance()).toBeTruthy();
  });

  it('it calls mapControls() on mounted', () => {
    expect(mapControlsFn).toBeCalled();
  });

  it('it maps controls', () => {
    const Form = selectWithProps(DynamicForm, {
      fields: DEFAULT_FIELDS,
    });

    expect(Form.vm.controls.length).toBeGreaterThan(0);
    expect(Form.vm.controls[0] instanceof FormControl).toBeTruthy();
  });

  it('it adds form id to every control', () => {
    const Form = selectWithProps(DynamicForm, {
      id: 'testId',
      fields: DEFAULT_FIELDS,
    });
    expect(Form.vm.controls[0].form).toBe('testId');
  });

  it('it calls handleSubmit when submitted', () => {
    const Form = selectWithProps(DynamicForm, {
      id: 'testId',
      fields: DEFAULT_FIELDS,
    });
    Form.find('form').trigger('submit.prevent');
    expect(handleSubmitFn).toBeCalled();
    expect(Form.vm.submited).toBeTruthy();
  });

  /*  it('it check if form is valid', async () => {
    const Form = selectDeepWithProps(DynamicForm, {
      id: 'testId',
      fields: DEFAULT_FIELDS,
    });

    const emailInput = Form.find(DynamicInput).html();
     emailInput.setValue('alvaro.saburido');
    console.log('Email Input', emailInput);
    expect(Form.vm.isValid).toBeFalsy();
  }); */
});
