import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const methods = {
  valueChange() {
    this.$emit('change', this.formControl.value);
  },
  onFocus() {
    this.$emit('focus');
  },
  onBlur() {
    this.$emit('blur');
    this.formControl.touched = true;
  },
};

const InputSelect = {
  name: 'asInputSelect',
  props,
  methods,
};

export default InputSelect;
