<template>
  <select
    :id="formControl.id"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
    @change="valueChange()"
    @focus="onFocus()"
    @blur="onBlur()"
  >
    <option
      v-for="opt in formControl.options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.text }}
    </option>
  </select>
</template>
<script src="./InputSelect.js"></script>
